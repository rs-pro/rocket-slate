import React from 'react';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { COLOR_BG, COLOR_FONT } from './Button';

export const RocketSlateColorsPlugin = (): IRocketSlatePlugin => {
  return {
    plugin: {
      renderLeaf: ({ leaf, children }) => {
        if (leaf[COLOR_BG] || leaf[COLOR_FONT]) {
          return <span style={{ backgroundColor: leaf[COLOR_BG], color: leaf[COLOR_FONT] }}>{children}</span>;
        }
        return children;
      },
    },
  };
};
