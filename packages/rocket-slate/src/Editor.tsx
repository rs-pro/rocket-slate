// This is an example with all the plugins enabled
// It is designed for use as-is
// Copy this file to your project and customize as necessary if you want

import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';

import { Element, Leaf } from './plugins';
import initialValue from './initialValue';
import Toolbar from './Toolbar';

import { withWysiwyg } from '@rocket-slate/wysiwyg';
// import { withPasteHtml } from '@rocket-slate/paste-html';
// import { withMentions } from '@rocket-slate/mentions';
// import { withLinks } from '@rocket-slate/links';
// import { withTables } from '@rocket-slate/table';

const plugins = [
  withWysiwyg,
  // withPasteHtml,
  // withTables,
  // withLinks,
  // withMentions
];

interface IEditorProps {
  initialValue?: Node[];
  toolbarButtons?: string[];
}

const Editor: React.FunctionComponent<IEditorProps> = (props) => {
  const { toolbarButtons } = props;
  const [value, setValue] = useState(props.initialValue || initialValue);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const handlerChangeValueEditor = useCallback((value) => setValue(value), []);

  const editor = useMemo(() => {
    return withReact(
      [...plugins].reduce((editorWithPlugins, plugin) => plugin(editorWithPlugins), withHistory(createEditor())),
    );
  }, []);

  return (
    <div className="RocketSlate">
      <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
        <div className="RocketSlate__Toolbar">
          <Toolbar buttons={toolbarButtons} />
        </div>
        <div className="RocketSlate__Editor">
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} placeholder="Paste in some HTML..." />
        </div>
      </Slate>
    </div>
  );
};

export default Editor;
