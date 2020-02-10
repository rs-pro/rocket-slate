// This is an example with all the plugins enabled
// It is designed for use as-is
// Copy this file to your project and customize as necessary if you want

import React, { useCallback, useMemo, useState } from 'react';
import { Editable, Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { Element, Leaf } from './plugins';
import initialEditorState from './initialEditorState';
import Toolbar from './Toolbar';

import { withWysiwyg } from '@rocket-slate/wysiwyg';
import { withPasteHtml } from '@rocket-slate/paste-html';
import { withMentions } from '@rocket-slate/mentions';
import { withLinks } from '@rocket-slate/links';
import { withTables } from '@rocket-slate/table';

const plugins = [
  withPasteHtml,
  withTables,
  withWysiwyg,
  withLinks,
  withMentions,
];

interface IEditorProps {
  initialValue: any;
}

function Editor(props: IEditorProps) {
  console.log(initialEditorState);
  const [value, setValue] = useState(props.initialValue || initialEditorState);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const handlerChangeValueEditor = useCallback((value) => setValue(value), []);

  const editor = useMemo(() => {
    return [withHistory, ...plugins, withReact].reduce(
      (editorWithPlugins, plugin) => plugin(editorWithPlugins),
      createEditor(),
    );
  }, []);

  console.log('render slate', editor, value);

  return (
    <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
      <Toolbar buttons={[]} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Paste in some HTML..."
      />
    </Slate>
  );
}

export default Editor;
