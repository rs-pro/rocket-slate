import React from 'react';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { COLOR_BG, COLOR_FONT } from './Button';

import locale from './locales';

export const RocketSlateColorsPlugin = (): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      editor.addLocale(locale);
      return editor;
    },
    plugin: {
      renderLeaf: ({ leaf, children }) => {
        if (leaf[COLOR_BG] || leaf[COLOR_FONT]) {
          return <span style={{ backgroundColor: leaf[COLOR_BG], color: leaf[COLOR_FONT] }}>{children}</span>;
        }
        return children;
      },
      deserialize: {
        leaf: {
          SPAN: el => {
            const leaf = {
              [COLOR_FONT]: el.style.color ? el.style.color : undefined,
              [COLOR_BG]: el.style.backgroundColor ? el.style.backgroundColor : undefined,
            };
            return (
              (leaf[COLOR_FONT] || leaf[COLOR_BG]) &&
              Object.entries(leaf).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})
            );
          },
        },
      },
    },
  };
};
