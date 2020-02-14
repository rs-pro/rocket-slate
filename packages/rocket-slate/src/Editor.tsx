import React, { useCallback, useMemo, useState } from 'react';
import styled, { ThemedStyledFunction } from 'styled-components';
import { Editor, Node } from 'slate';
import { Slate, withReact } from 'slate-react';
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

const RocketSlateWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 2px;
`;

type EditablePluginsProps = React.ComponentProps<typeof EditablePlugins>;
const RocketSlateEditable: React.FunctionComponent<EditablePluginsProps> = styled(EditablePlugins)<
  EditablePluginsProps
>`
  padding: 10px;
`;

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
    <RocketSlateWrapper className={`RocketSlate ${className || ''}`}>
      <Slate editor={editor} value={value} onChange={handlerChangeValueEditor}>
        {children}
        <RocketSlateEditable
          className="RocketSlate__Editor"
          plugins={slatePlugins}
          placeholder={placeholder}
          readOnly={readOnly}
          {...handlers}
        />
      </Slate>
    </RocketSlateWrapper>
  );
};

export default RocketSlateEditor;
