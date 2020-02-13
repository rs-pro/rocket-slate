import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { createEditor, Editor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import {
  SlatePlugin,
  EditablePlugins,
  withBlock,
  withBreakEmptyReset,
  withDeleteStartReset,
  ACTION_ITEM,
  BLOCKQUOTE,
} from 'slate-plugins-next';

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

export interface IResetOption {
  types: string[];
  onUnwrap?: any;
}

export interface IRocketSlateEditorProps {
  plugins?: IRocketSlatePlugin[];
  initialValue?: Node[];
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const RocketSlateEditor: React.FunctionComponent<IRocketSlateEditorProps> = ({
  plugins = [],
  initialValue = _initialValue,
  placeholder = 'Paste in some text...',
  readOnly,
  children,
  className,
}) => {
  const [value, setValue] = useState(initialValue);

  const editor = useEditorWithPlugin(plugins);
  const handlers = useHandlers(plugins, editor);
  const slatePlugins = useMemo(() => plugins.map(({ plugin }) => plugin), plugins);

  const handlerChangeValueEditor = useCallback((value) => setValue(value), []);

  return (
    <div className={`RocketSlate ${className}`}>
      <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
        {children}
        <div className="RocketSlate__Editor">
          <EditablePlugins plugins={slatePlugins} placeholder={placeholder} readOnly={readOnly} {...handlers} />
        </div>
      </Slate>
    </div>
  );
};

export default RocketSlateEditor;
