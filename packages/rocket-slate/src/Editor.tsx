import React, { useCallback, useMemo, useState } from 'react';
import { Editor, Node } from 'slate';
import { Slate, Editable, RenderElementProps, RenderLeafProps, useEditor } from 'slate-react';

import _initialValue from './initialValue';
import { useButtons, useEditorWithPlugin, useElements, useHandlers, useLeaves } from './hooks';
import Toolbar, { IButtonList } from './Toolbar';
import Element from './Element';
import Leaf from './Leaf';

import wysiwygPluginConfig from '@rocket-slate/wysiwyg';

const defaultPlugins = [
  wysiwygPluginConfig,
  // withPasteHtml,
  // withTables,
  // withLinks,
  // withMentions
];

export interface IRocketSlatePlugin {
  name: string;
  elements?: Array<{
    type: string;
    renderFn: React.FunctionComponent<RenderElementProps>;
  }>;
  leaves?: Array<{
    type: string;
    renderFn: React.FunctionComponent<RenderLeafProps>;
  }>;
  withHOC?: <T extends Editor>(editor: T) => T;
  handlers?: {
    [eventName in keyof Omit<React.DOMAttributes<HTMLDivElement>, 'children' | 'dangerouslySetInnerHTML'>]: (
      // @ts-ignore
      event: Parameters<React.DOMAttributes<HTMLDivElement>[eventName]>[0],
      editor: Editor,
    ) => void;
  };
  buttons?: IButtonList;
}

export interface IRocketSlateEditorProps {
  initialValue?: Node[];
  plugins?: IRocketSlatePlugin[];
  placeholder?: string;
  readOnly?: boolean;
}

const RocketSlateEditor: React.FunctionComponent<IRocketSlateEditorProps> = ({
  plugins = defaultPlugins,
  initialValue = _initialValue,
  placeholder = 'Paste in some HTML...',
  readOnly,
  children,
}) => {
  const [value, setValue] = useState(initialValue);

  const editor = useEditorWithPlugin(plugins);
  const elements = useElements(plugins);
  const leaves = useLeaves(plugins);
  const buttons = useButtons(plugins);
  const handlers = useHandlers(plugins, editor);

  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} elements={elements} />, []);
  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} leaves={leaves} />, []);
  const handlerChangeValueEditor = useCallback((value) => setValue(value), []);

  return (
    <div className="RocketSlate">
      <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
        <div className="RocketSlate__Toolbar">
          <Toolbar buttons={buttons} />
        </div>
        <div className="RocketSlate__Editor">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            readOnly={readOnly}
            {...handlers}
          />
        </div>
        {children}
      </Slate>
    </div>
  );
};

export default RocketSlateEditor;
