import React, { useState, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { diffChars } from 'diff';
import { Editor, Transforms } from 'slate';
import { RenderElementProps, ReactEditor, useSlate, useFocused, useSelected, useReadOnly } from 'slate-react';
import { CODE, CodePlugin } from 'slate-plugins-next';
import EditorCode from 'react-simple-code-editor';

const CodeWrap = styled.div`
  position: relative;
  font-family: monospace;
  background-color: #f7f7f7;
  font-size: 1em;
  padding: 0.25em 0.4em;
  margin: 0.5em 0;
  border-radius: 2px;
  border: 1px solid #acacac;

  textarea:focus {
    outline: none;
  }
`;

const SelectWrap = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`;

const escapeEl = document.createElement('textarea');

export const escapeHTML = (html) => {
  escapeEl.textContent = html;
  return escapeEl.innerHTML;
};

export interface IHighlights {
  highlight: (value: string, language?: string) => string | React.ReactNode;
  languages?: Array<{ value: string; label: string }>;
}

export const RocketSlateCodeBlock = (props: RenderElementProps & IHighlights) => {
  const { element, children, attributes, highlight, languages } = props;
  const {
    lang,
    children: [{ text }],
  } = element;
  const editor = useSlate();
  const isReadonly = useReadOnly();
  const pathElement = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);
  const [code, setCode] = useState(text);

  const handlerChangeCode = useCallback(
    (code) => {
      setCode(code);
      const at = Editor.range(editor, pathElement);
      const { path } = at.anchor;
      setTimeout(() => {
        const diff = diffChars(text, code);
        let offset = 0;
        diff.forEach((change) => {
          if (change.added) {
            editor.apply({
              type: 'insert_text',
              path,
              offset,
              text: change.value,
            });
          }
          if (change.removed) {
            editor.apply({
              type: 'remove_text',
              path,
              offset,
              text: change.value,
            });
          }
          offset += change.count || 0;
        });
      });
    },
    [text, element],
  );

  const handlerHighlight = useCallback(
    (code) => {
      console.log('handlerHighlight');
      return highlight(code, lang);
    },
    [lang, highlight],
  );

  const handlerChangeSelect = useCallback(
    (e) => {
      Transforms.setNodes(editor, { lang: e.target.value }, { at: pathElement });
    },
    [pathElement],
  );

  return (
    <CodeWrap {...attributes} data-slate-type={CODE} contentEditable={false}>
      <EditorCode
        key={lang}
        value={code}
        highlight={handlerHighlight}
        onValueChange={handlerChangeCode}
        readOnly={isReadonly}
      />
      {languages && !isReadonly && (
        <SelectWrap>
          <select value={lang} defaultValue="" onChange={handlerChangeSelect}>
            <option disabled={true} value="">
              Выберите язык
            </option>
            {languages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </SelectWrap>
      )}
      {children}
    </CodeWrap>
  );
};
