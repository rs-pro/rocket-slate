import { IRocketSlatePlugin } from '@rocket-slate/core';
import { ReactEditor } from 'slate-react';

const ON_INSERT_FILE = new WeakMap();

export const RocketSlateUploadPlugin = (options: {
  onInsertFile: (
    files: FileList,
    onComplete: (uploadedFiles: Array<{ url: string; name: string }>) => void,
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
        const { selection } = editor;
        const { files } = data;
        if (files && files.length > 0) {
          const uploadFiles = ON_INSERT_FILE.get(editor);
          if (uploadFiles) {
            uploadFiles(
              files,
              () => {
                // TODO insert link
              },
              () => {},
            );
          }
        } else {
          insertData(data);
        }
      };
      return editor;
    },
  };
};
