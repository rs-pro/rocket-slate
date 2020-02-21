import React from 'react';
import { Editor, Transforms } from 'slate';
import { IMAGE, ImagePlugin, isImageUrl, PARAGRAPH } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { RocketImageElement, IImageData } from './Image';

export const insertImage = (editor: Editor, data: IImageData) => {
  Transforms.insertNodes(editor, [
    { type: IMAGE, data, children: [{ text: '' }] },
    { type: PARAGRAPH, children: [{ text: '' }] },
  ]);
};

export const RocketSlateImagePlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: ImagePlugin({
      component: RocketImageElement,
      ...options,
    }),
    withPlugin: (editor) => {
      const { insertData, isVoid } = editor;

      editor.isVoid = (element) => {
        return element.type === IMAGE ? true : isVoid(element);
      };

      editor.insertData = (data: DataTransfer) => {
        const text = data.getData('text/plain');
        const { files } = data;
        console.log(data, files);
        if (files && files.length > 0) {
          Promise.all(
            Array.from(files).map((file) => {
              return new Promise((resolve) => {
                const [mime] = file.type.split('/');
                if (mime === 'image') {
                  insertImage(editor, { src: '', file });
                  // const reader = new FileReader();
                  // reader.addEventListener('load', () => {
                  //   const url = reader.result;
                  //   if (url) {
                  //     insertImage(editor, url);
                  //   }
                  //   resolve();
                  // });
                  // reader.readAsDataURL(file);
                } else {
                  resolve();
                }
              });
            }),
          ).then(() => {
            insertData(data);
          });
        } else if (isImageUrl(text)) {
          insertImage(editor, { src: text });
        } else {
          insertData(data);
        }
      };

      return editor;
    },
  };
};
