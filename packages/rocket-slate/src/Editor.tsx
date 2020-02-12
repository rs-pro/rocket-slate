import React, { useCallback, useMemo, useState } from 'react';
import { Editor, Node } from 'slate';
import { Slate } from 'slate-react';
import { SlatePlugin, EditablePlugins } from 'slate-plugins-next';

import _initialValue from './initialValue';
import { useEditorWithPlugin, useHandlers } from './hooks';

export interface IRocketSlatePlugin {
  plugin: SlatePlugin;
  withPlugin?: <T extends Editor>(editor: T) => T;
  handlers?: {
    [eventName in keyof Omit<React.DOMAttributes<HTMLDivElement>, 'children' | 'dangerouslySetInnerHTML'>]: (
      // @ts-ignore
      event: Parameters<React.DOMAttributes<HTMLDivElement>[eventName]>[0],
      editor: Editor,
    ) => void;
  };
}

export interface IRocketSlateEditorProps {
  initialValue?: Node[];
  plugins?: IRocketSlatePlugin[];
  placeholder?: string;
  readOnly?: boolean;
}

const RocketSlateEditor: React.FunctionComponent<IRocketSlateEditorProps> = ({
  plugins = [],
  initialValue = _initialValue,
  placeholder = 'Paste in some text...',
  readOnly,
  children,
}) => {
  const [value, setValue] = useState(initialValue);

  const editor = useEditorWithPlugin(plugins);
  const handlers = useHandlers(plugins, editor);
  const slatePlugins = useMemo(() => plugins.map(({ plugin }) => plugin), plugins);

  const handlerChangeValueEditor = useCallback((value) => setValue(value), []);

  return (
    <div className="RocketSlate">
      <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
        <div className="RocketSlate__Children">{children}</div>
        <div className="RocketSlate__Editor">
          <EditablePlugins plugins={slatePlugins} placeholder={placeholder} readOnly={readOnly} {...handlers} />
        </div>
      </Slate>
    </div>
  );
};

export default RocketSlateEditor;
