import React from 'react';
import { Editor, Range, Transforms } from 'slate';
import { IMAGE, ImagePlugin, isImageUrl, PARAGRAPH } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { RocketImageElement, IImageData } from './Image';

export const insertImage = (editor: Editor, data: IImageData) => {
  Transforms.insertNodes(editor, { type: IMAGE, data, children: [{ text: '' }] });
  Transforms.insertNodes(editor, { type: PARAGRAPH, children: [{ text: '' }] });
};

export const RocketSlateImagePlugin = (
  options: RenderElementOptions & {
    onInsertImage: (file: File, callback: (url: string) => void) => void;
  },
): IRocketSlatePlugin => {
  const { onInsertImage, ...restOptions } = options;
  return {
    plugin: ImagePlugin({
      component: RocketImageElement,
      ...restOptions,
    }),
    withPlugin: (editor) => {
      const { insertData, isVoid } = editor;

      editor.isVoid = (element) => {
        return element.type === IMAGE ? true : isVoid(element);
      };

      editor.insertData = (data: DataTransfer) => {
        const text = data.getData('text/plain');
        const { files } = data;
        if (files && files.length > 0) {
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
                onInsertImage(file, (url) => {
                  Transforms.setNodes(editor, { data: { src: url } }, { at: range });
                  if (window.URL && window.URL.revokeObjectURL) {
                    window.URL.revokeObjectURL(objectURL);
                  }
                });
              }
            }
          });
          insertData(data);
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
