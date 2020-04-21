import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Editor, Node } from 'slate';
import { ReactEditor, Slate } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { SlatePlugin, EditablePlugins, ToggleBlockEditor } from 'slate-plugins-next';

import { useEditorWithPlugin, useHandlers } from './hooks';

type eventList = Required<
  Omit<React.DOMAttributes<HTMLDivElement>, 'children' | 'dangerouslySetInnerHTML' | 'onKeyDown'>
>;

export interface IRocketSlatePlugin {
  plugin?: SlatePlugin;
  withPlugin?: <T extends Editor & ReactEditor & HistoryEditor & ToggleBlockEditor>(editor: T) => T;
  handlers?: {
    [eventName in keyof eventList]: (
      event: Required<React.DOMAttributes<HTMLDivElement>>[eventName] extends (...args: any) => any
        ? Parameters<Required<React.DOMAttributes<HTMLDivElement>>[eventName]>[0]
        : never,
      editor: Editor,
    ) => void | undefined;
  };
}

export interface IResetOption {
  types: string[];
  onUnwrap?: any;
}

export interface IRocketSlateEditorProps {
  value: Node[];
  plugins?: IRocketSlatePlugin[];
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: Node[]) => void;
  before?: React.ReactNode;
  after?: React.ReactNode;
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

export const RocketSlate: React.FunctionComponent<IRocketSlateEditorProps> = ({
  value,
  plugins = [],
  placeholder = 'Paste in some text...',
  readOnly,
  className,
  onChange,
  before,
  after,
}) => {
  const [editorValue, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const editor = useEditorWithPlugin(plugins);
  const handlers = useHandlers(plugins, editor);
  const slatePlugins = useMemo(() => plugins.filter(({ plugin }) => plugin).map(({ plugin }) => plugin), plugins);

  const handlerChangeValueEditor = useCallback((value) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }, []);

  return (
    <RocketSlateWrapper className={`RocketSlate ${className || ''}`}>
      <Slate editor={editor} value={editorValue} onChange={handlerChangeValueEditor}>
        {before}
        <RocketSlateEditable
          className="RocketSlate__Editor"
          plugins={slatePlugins}
          placeholder={placeholder}
          readOnly={readOnly}
          {...handlers}
        />
        {after}
      </Slate>
    </RocketSlateWrapper>
  );
};
