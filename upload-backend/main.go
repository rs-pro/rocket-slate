package api

import (
	"context"
	"crypto/sha1"
	"errors"
	"io"
	"log"
	"mime"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"sync"

	"github.com/h2non/filetype"
	"github.com/h2non/filetype/types"
	"github.com/minio/minio-go"

	"github.com/gin-gonic/gin"
	"rscz.ru/rt/rtrack/app/models"
	"rscz.ru/rt/rtrack/config/uploader"
)

type File struct {
	ID int64 `gorm:"primary_key" json:"id"`

	IssueID int64  `gorm:"type:bigint REFERENCES issues(id);not null" json:"issue_id"`
	Issue   *Issue `json:"-"`

	Kind      string    `json:"kind"`
	Size      int64     `json:"size"`
	SHA1      []byte    `json:"sha1"`
	Name      string    `json:"name"`
	Mime      string    `json:"mime"`
	State     string    `json:"state"`
	Extension string    `json:"extension"`
	Path      *string   `json:"-" sql:"-"`
	URL       *string   `json:"url" sql:"-"`
	CreatedAt time.Time `json:"-"`
	Audited   `json:"-"`
}

func (f *File) GetPath() string {
	mils := f.ID / 1000000
	part1 := pad.Left(strconv.FormatInt(mils, 10), 3, "0")
	part2 := pad.Left(strconv.FormatInt((f.ID-1000000*mils)/1000, 10), 3, "0")
	part3 := pad.Left(strconv.FormatInt(f.ID%1000, 10), 3, "0")
	return "files/" + part1 + "/" + part2 + "/" + part3 + "/" + f.Name
}

func (f *File) GetUrl() string {
	return "/files/" + strconv.FormatInt(f.ID, 10) + "/" + f.Name
}


func FilesServe(c *gin.Context) {
	a := AuthJSON(c)
	if a == nil {
		return
	}

	fileID := c.Param("file_id")

	file := models.File{}
	err := models.DB.Preload("Issue").First(&file, fileID).Error
	if err != nil {
		InternalError(c, err, "file db find error")
		return
	}
	if !a.CanReadIssue(file.Issue) {
		ForbiddenError(c, "Access Denied (view issue)")
		return
	}

	ctx := context.TODO()

	header := c.Writer.Header()
	header["Content-type"] = []string{file.Mime}

	if file.Kind != "image" {
		header["Content-Disposition"] = []string{
			"attachment; filename= " + file.Name,
		}
	}

	object, err := uploader.Client.GetObjectWithContext(
		ctx,
		uploader.BucketName,
		file.GetPath(),
		minio.GetObjectOptions{},
	)

	if err != nil {
		if RedirectFiles {
			c.Redirect(http.StatusFound, "https://rtrack.ru"+c.Request.URL.Path)
			return
		}
		InternalError(c, err, "file read error")
		return
	}

	//c.Writer.Header().Set("content-type", file.Mime)

	if _, err = io.Copy(c.Writer, object); err != nil {
		//fmt.Println(err)
		if err.Error() == "The specified key does not exist." {
			NotFoundError(c, err, "File not found")
			return
		}
		InternalError(c, err, "file send error")
		return
	}
}

func FilesCreate(c *gin.Context) {
	issue, a := FindIssue(c, []string{"Project"})

	if !a.CanReadIssue(issue) {
		ForbiddenError(c, "Access Denied (read issue)")
		return
	}

	kind := c.Param("kind")

	var err error
	req := c.Request
	//log.Println("parse multipart form", kind, issue.ID)

	mediatype, params, err := mime.ParseMediaType(req.Header.Get("Content-Type"))
	if err != nil {
		InternalError(c, err, "parse content-type")
		return
	}
	if mediatype != "multipart/form-data" {
		InternalError(c, errors.New("only content-type multipart/form-data is supported"), "")
		return
	}
	boundary, ok := params["boundary"]
	if !ok {
		InternalError(c, errors.New("multipart boundary is not present in headers"), "")
		return
	}

	partReader := multipart.NewReader(req.Body, boundary)

	var writer *io.PipeWriter
	var reader *io.PipeReader

	mfiles := make([]models.File, 0)

	fileData := make([]byte, 0)
	buf := make([]byte, 4096)
	for {
		part, err := partReader.NextPart()
		if err == io.EOF {
			log.Println("multipart: io: EOF")
			break
		}
		if err != nil {
			if err.Error() == "multipart: NextPart: EOF" {
				log.Println("multipart: NextPart: EOF")
				break
			}
			log.Println("next part error", err)
			return
		}
		//log.Println("found part", part.FileName(), part.FormName())
		mfile := models.File{
			IssueID: issue.ID,
			Kind:    kind,
			Name:    part.FileName(),
			State:   "uploading",
		}

		h := sha1.New()

		err = models.DB.Set("audited:current_user", a.User()).Save(&mfile).Error
		if err != nil {
			InternalError(c, err, "failed to save file to DB")
			return
		}
		pth := mfile.GetPath()
		mfile.Path = &pth
		u := mfile.GetUrl()
		mfile.URL = &u

		var mimeType *types.Type
		totalRead := int64(0)
		var n int

		mimeFound := false
		var minioError error
		var wg sync.WaitGroup

		for {
			n, err = part.Read(buf)
			//log.Println("read", n)

			doBreak := false
			fileData = append(fileData, buf[:n]...)
			totalRead += int64(n)

			if err == io.ErrUnexpectedEOF {
				//log.Println("processed", len(buf[:n]), "unexpected EOF")
				break
			}
			if err == io.EOF {
				//log.Println("processed", len(buf[:n]), "normal EOF")
				if !mimeFound {
					doBreak = true
				} else {
					break
				}
			} else {
				if err != nil {
					log.Println("part decode error", err)
					return
				}
			}

			if doBreak || ((err == io.EOF || totalRead > 1024) && mimeType == nil) {
				log.Println("try detect mime")
				mt, err := filetype.Match(fileData)
				if err != nil {
					log.Println("mime type match error", err)
				} else {
					//log.Println("found mime:")
					//spew.Dump(mt)
					mimeType = &mt

					ctx := context.TODO()
					reader, writer = io.Pipe()

					mfile.Mime = mimeType.MIME.Value
					mimeFound = true
					wg.Add(1)
					go func() {
						println(mfile.GetUrl())
						var minioN int64
						minioN, minioError = uploader.Client.PutObjectWithContext(
							ctx,
							uploader.BucketName,
							*mfile.Path,
							reader,
							-1,
							minio.PutObjectOptions{
								ContentType: mimeType.MIME.Value,
							},
						)
						if minioError != nil {
							log.Println("storage error:", minioError)
							panic("storage error")
							return
						}
						wg.Done()
						log.Println("write", minioN, "to minio", minioError)
					}()
					log.Println("write 1", len(fileData))
					h.Write(fileData)
					writer.Write(fileData)
					fileData = []byte{}
				}
				if doBreak {
					//log.Println("break")
					break
				}
			} else if writer != nil && len(fileData) > 0 {
				//log.Println("write 2", len(fileData))
				h.Write(fileData)
				writer.Write(fileData)
				fileData = []byte{}
			}
		}

		if len(fileData) > 0 {
			//log.Println("write 3", len(fileData))
			h.Write(fileData)
			writer.Write(fileData)
			fileData = []byte{}
		}

		if writer == nil {
			InternalError(c, err, "no file uploaded (no writer)")
			return
		}
		//println("close writer")
		writer.Close()
		//println("wait minio writer")
		wg.Wait()

		mfile.Size = totalRead
		mfile.SHA1 = h.Sum(nil)
		mfile.Extension = filepath.Ext(mfile.Name)
		mfile.State = "ok"

		err = models.DB.Set("audited:current_user", a.User()).Save(&mfile).Error
		if err != nil {
			InternalError(c, err, "failed to save file to DB")
			return
		}

		mfiles = append(mfiles, mfile)
	}
	if len(mfiles) == 0 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "no files uploaded"})
		return
	}

	c.JSON(http.StatusOK, mfiles)
}

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	r.Run(":2999")
}
