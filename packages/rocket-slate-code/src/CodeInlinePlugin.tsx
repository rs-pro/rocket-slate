import React from 'react';
import styled from 'styled-components';
import { InlineCodePlugin, MARK_CODE } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { InlineCodePluginOptions } from 'slate-plugins-next/dist/marks/inline-code/types';

import locale from './locales';

const CodeInline = styled.code`
  font-family: monospace;
  background-color: #f7f7f7;
  font-size: 1em;
  padding: 0.25em 0.4em;
  border-radius: 2px;
  border: 1px solid #acacac;
`;

const RocketSlateCodeInlinePlugin = (options?: InlineCodePluginOptions): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      editor.addLocale(locale);
      return editor;
    },
    plugin: {
      ...InlineCodePlugin(options),
      renderLeaf: ({ leaf, children }) => {
        if (leaf[MARK_CODE]) {
          return <CodeInline>{children}</CodeInline>;
        }
        return children;
      },
    },
  };
};

export { RocketSlateCodeInlinePlugin };
