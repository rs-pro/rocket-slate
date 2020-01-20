package uploader

import (
	"log"

	"github.com/minio/minio-go"
	"rscz.ru/rt/rtrack/config/secrets"
)

var Client *minio.Client
var BucketName string

func init() {
	endpoint := secrets.Storage.Endpoint
	accessKeyID := secrets.Storage.AccessKey
	secretAccessKey := secrets.Storage.SecretKey
	BucketName = secrets.Storage.Bucket
	useSSL := false

	// Initialize minio client object.
	var err error
	log.Println("using minio storage at", endpoint)
	Client, err = minio.New(endpoint, accessKeyID, secretAccessKey, useSSL)
	if err != nil {
		log.Println("minio connect fail", err)
		return
	}

	err = Client.MakeBucket(BucketName, "main-location")
	if err != nil {
		// Check to see if we already own this bucket (which happens if you run this twice)
		exists, err := Client.BucketExists(BucketName)
		if err == nil && exists {
			log.Printf("We already own %s\n", BucketName)
		} else {
			log.Fatalln("minio error:", err)
		}
	} else {
		log.Printf("Successfully created %s\n", BucketName)
	}
}
