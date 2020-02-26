import React, { useState } from 'react';
import styled from 'styled-components';
import { RenderElementProps } from 'slate-react';
import { CODE, CodePlugin } from 'slate-plugins-next';
import EditorCode from 'react-simple-code-editor';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';

const CodeWrap = styled.div`
  font-family: monospace;
  background-color: #eee;
  font-size: 1em;
  padding: 0.25em 0.4em;
  border-radius: 2px;
  border: 1px solid #acacac;
`;

const RocketSlateCodeBlock = (
  props: RenderElementProps & {
    highlight: (value: string) => string | React.ReactNode;
  },
) => {
  const { element, children, attributes, highlight = (code) => code } = props;
  const [code, setCode] = useState('function() { return 1 };');
  return (
    <div {...attributes} data-slate-type={CODE} contentEditable={false}>
      <div>
        <input />
        <EditorCode
          value={code}
          onValueChange={(code) => {
            console.log('setCode');
            setCode(code);
          }}
          highlight={highlight}
        />
      </div>
      {children}
    </div>
  );
};

const RocketSlateCodePlugin = (options: {
  highlight: (value: string) => string | React.ReactNode;
}): IRocketSlatePlugin => {
  const { highlight } = options;
  return {
    plugin: {
      ...CodePlugin({
        component: (props: RenderElementProps) => <RocketSlateCodeBlock {...props} highlight={highlight} />,
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

export { RocketSlateCodePlugin };
