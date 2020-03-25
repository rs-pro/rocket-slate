import React from 'react';
import { RenderElementProps } from 'slate-react';
import { CODE, CodePlugin } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { IHighlights, RocketSlateCodeBlock } from './RocketSlateCodeBlock';

export const RocketSlateCodePlugin = (options: IHighlights): IRocketSlatePlugin => {
  return {
    plugin: {
      ...CodePlugin({
        component: (props: RenderElementProps) => <RocketSlateCodeBlock {...props} {...options} />,
      }),
    },
    withPlugin: (editor) => {
      const { isVoid } = editor;
      editor.isVoid = (element) => {
        return element.type === CODE ? true : isVoid(element);
      };
      return editor;
    },
  };
};
