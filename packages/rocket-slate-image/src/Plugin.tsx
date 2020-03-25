import React from 'react';
import { Editor, Transforms } from 'slate';
import { IMAGE, ImagePlugin, isImageUrl, PARAGRAPH } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { RocketImageElement, IImageData } from './Image';

export const insertImage = (editor: Editor, data: IImageData) => {
  Transforms.insertNodes(editor, { type: IMAGE, data, children: [{ text: '' }] });
  Transforms.insertNodes(editor, { type: PARAGRAPH, children: [{ text: '' }] });
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
        if (text && isImageUrl(text)) {
          insertImage(editor, { src: text });
        } else {
          insertData(data);
        }
      };

      return editor;
    },
  };
};
