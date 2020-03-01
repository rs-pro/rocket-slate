import { IRocketSlatePlugin } from '@rocket-slate/core';
import { ReactEditor } from 'slate-react';
import { Editor, Range, Transforms } from 'slate';
import { insertImage } from '@rocket-slate/image';
import { insertLink } from 'slate-plugins-next';

type HandlerInsertFile = (
  file: File,
  onComplete: (uploadedFile: { url: string; name: string }) => void,
  onError: () => void,
  onProgress?: (progress: number) => void,
) => void;

const ON_INSERT_FILE = new WeakMap<object, HandlerInsertFile>();

export const RocketSlateUploadPlugin = (options: {
  onInsertFile: (
    file: File,
    onComplete: (uploadedFile: { url: string; name: string }) => void,
    onError: () => void,
    onProgress?: (progress: number) => void,
  ) => void;
}): IRocketSlatePlugin => {
  const { onInsertFile } = options;
  return {
    plugin: {},
    withPlugin: <T extends ReactEditor>(editor: T): T => {
      const { insertData } = editor;

      ON_INSERT_FILE.set(editor, onInsertFile);

      editor.insertData = (data) => {
        const { files } = data;
        if (files && files.length > 0) {
          const uploadFiles = ON_INSERT_FILE.get(editor);
          if (uploadFiles) {
            Array.from(files).forEach((file) => {
              const [mime] = file.type.split('/');
              if (mime === 'image') {
                let objectURL;
                if (window.URL && window.URL.createObjectURL) {
                  objectURL = window.URL.createObjectURL(file);
                  insertImage(editor, { src: objectURL, isLoading: true });
                } else {
                  insertImage(editor, { src: '', isLoading: true });
                }
                const { selection } = editor;
                if (selection) {
                  const [start] = Range.edges(selection);
                  const beforeBlock = Editor.before(editor, start, {
                    unit: 'block',
                  });
                  const range = beforeBlock && Editor.range(editor, beforeBlock, start);
                  uploadFiles(
                    file,
                    ({ url }) => {
                      Transforms.setNodes(editor, { data: { src: url } }, { at: range });
                      if (window.URL && window.URL.revokeObjectURL && objectURL) {
                        window.URL.revokeObjectURL(objectURL);
                      }
                    },
                    () => {},
                  );
                }
              } else {
                uploadFiles(
                  file,
                  ({ url }) => {
                    insertLink(editor, url);
                  },
                  () => {},
                );
              }
            });
          }
        } else {
          insertData(data);
        }
      };
      return editor;
    },
  };
};
