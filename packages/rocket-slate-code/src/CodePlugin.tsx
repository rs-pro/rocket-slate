import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Transforms, Editor } from 'slate';
import { RenderElementProps, ReactEditor, useSlate } from 'slate-react';
import { CODE, CodePlugin } from 'slate-plugins-next';
import EditorCode from 'react-simple-code-editor';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';

const CodeWrap = styled.div`
  font-family: monospace;
  background-color: #f7f7f7;
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
  const editor = useSlate();
  const { element, children, attributes, highlight = (code) => code } = props;
  const { children: [{ text }] } = element;
  const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);
  const [code, setCode] = useState('');
  console.log('props', props);
  return (
    <CodeWrap {...attributes} data-slate-type={CODE} contentEditable={false}>
      <EditorCode
        value={code || ""}
        onValueChange={(code) => {
          Editor.insertText(editor, code);
          setCode(code);
        }}
        highlight={highlight}
      />
    </CodeWrap>
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
