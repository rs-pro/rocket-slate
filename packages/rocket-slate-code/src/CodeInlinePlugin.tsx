import React from 'react';
import styled from 'styled-components';
import { InlineCodePlugin, MARK_CODE } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { InlineCodePluginOptions } from 'slate-plugins-next/dist/marks/inline-code/types';

const CodeInline = styled.code`
  font-family: monospace;
  background-color: #eee;
  font-size: 1em;
  padding: 0.25em 0.4em;
  margin: 0 0.3em;
  border-radius: 2px;
  border: 1px solid #acacac;
`;

const RocketSlateCodeInlinePlugin = (options?: InlineCodePluginOptions): IRocketSlatePlugin => {
  return {
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
