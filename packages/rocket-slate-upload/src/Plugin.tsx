import React from 'react';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { insertImage, IImageData } from '@rocket-slate/image';
import { wrapLink } from '@rocket-slate/links';
import { ON_INSERT_FILE, ON_UPLOAD_START, ON_UPLOAD_PROGRESS, ON_UPLOAD_COMPLETE } from './events';
import { HandlerInsertFile } from './types';
import locale from './locales';

let globalProgressArray: any[] = [];

const completeProgress = editor => {
  const onUploadComplete = ON_UPLOAD_COMPLETE.get(editor);
  if (onUploadComplete) {
    onUploadComplete();
  }
  globalProgressArray = [];
}

const updateProgress = editor => {
  const progressArray = globalProgressArray.reduce((acc, values) => [...acc, ...values], []);
  const progressPerLocalTotal = 100 / progressArray.length;
  const progress = progressArray.reduce((sum, progress) => sum + (progress / 100) * progressPerLocalTotal, 0);

  const onUploadProgress = ON_UPLOAD_PROGRESS.get(editor);
  if (onUploadProgress) {
    onUploadProgress(progress <= 100 ? progress : 100);
  }
};

export const insertFiles = (editor: ReactEditor, files: FileList) => {
  const onInsertFile = ON_INSERT_FILE.get(editor);
  const onUploadStart = ON_UPLOAD_START.get(editor);
  if (onInsertFile) {
    if (onUploadStart) {
      onUploadStart();
    }
    const localProgressArray = new Array(files.length).fill(0);
    globalProgressArray.push(localProgressArray);

    const onProgressLocal = (index, progress) => {
      localProgressArray[index] = progress;
      updateProgress(editor);
    };

    const uploadedFiles = Array.from(files).map((file, index) => {
      return new Promise(resolve => {
        const onError = () => {
          onProgressLocal(index, 100);
          resolve();
        };
        const onProgress = progress => {
          onProgressLocal(index, progress);
        };
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          const imgData: IImageData = {
            src: window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(file) : '',
            title: file.name,
            isLoading: true,
          };
          insertImage(editor, imgData);
          if (editor.selection) {
            const [start] = Range.edges(editor.selection);
            const beforeBlock = Editor.before(editor, start, {
              unit: 'block',
            });
            const range = beforeBlock && Editor.range(editor, beforeBlock, start);
            onInsertFile(
              file,
              ({ id, url }) => {
                const { isLoading,  ...restImagData } = imgData
                Transforms.setNodes(editor, { data: { ...restImagData, id, src: url } }, { at: range });
                if (window.URL && window.URL.revokeObjectURL && imgData.src) {
                  window.URL.revokeObjectURL(imgData.src);
                }
                onProgress(100);
                resolve();
              },
              onError,
              onProgress,
            );
          }
        } else {
          onInsertFile(
            file,
            file => {
              if (editor.selection) {
                if (!Range.isCollapsed(editor.selection)) {
                  Transforms.collapse(editor, {
                    edge: 'end',
                  });
                }
                const { id, url, name, size } = file;
                const [start] = Range.edges(editor.selection);
                Transforms.insertText(editor, name || url);
                const [end] = Range.edges(editor.selection);
                const range = Editor.range(editor, start, end);
                Transforms.setSelection(editor, range);
                wrapLink(editor, { url, file: { id, size } });
                editor.insertBreak();
                onProgress(100);
              }
              resolve();
            },
            onError,
            onProgress,
          );
        }
      });
    });
    Promise.all(uploadedFiles).then(() => {
      updateProgress(editor);
      completeProgress(editor);
    });
  }
};

export const RocketSlateUploadPlugin = (options: { onInsertFile: HandlerInsertFile }): IRocketSlatePlugin => {
  const { onInsertFile } = options;
  return {
    withPlugin: editor => {
      const { insertData } = editor;

      editor.addLocale(locale);

      ON_INSERT_FILE.set(editor, onInsertFile);

      editor.insertData = data => {
        const { files } = data;
        if (files && files.length > 0) {
          insertFiles(editor, files);
        } else {
          insertData(data);
        }
      };

      return editor;
    },
  };
};
