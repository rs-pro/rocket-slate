import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Slate } from 'slate-react';
import { EditablePlugins } from 'slate-plugins-next';
import { useEditorWithPlugin, useHandlers } from './hooks';
import { IRocketSlateEditorProps } from './types';

const RocketSlateWrapper = styled.div<{ readOnly?: boolean }>`
  border: ${props => (props.readOnly ? 'none' : '1px solid #ccc')};
  border-radius: 2px;
`;

type EditablePluginsProps = React.ComponentProps<typeof EditablePlugins>;
const RocketSlateEditable: React.FunctionComponent<EditablePluginsProps> = styled(EditablePlugins)<
  EditablePluginsProps
>`
  padding: ${props => (props.readOnly ? '0' : '10px')};
`;

export const RocketSlate: React.FunctionComponent<IRocketSlateEditorProps> = ({
  value,
  plugins = [],
  placeholder = 'Paste in some text...',
  readOnly,
  className,
  onChange,
  renderBefore,
  renderAfter,
  renderToolbar,
  locale = 'ru',
  i18n,
}) => {
  const [editorValue, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const editor = useEditorWithPlugin(plugins);

  editor.setLocale(locale); // TODO: возможно нужно переделать

  useEffect(() => {
    editor.addLocale(i18n || {});
  }, [i18n]);

  const handlers = useHandlers(plugins, editor);
  const slatePlugins = useMemo(() => plugins.filter(({ plugin }) => plugin).map(({ plugin }) => plugin), plugins);

  const handlerChangeValueEditor = useCallback(value => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }, []);

  return (
    <RocketSlateWrapper
      className={classNames('RocketSlate', className, { 'RocketSlate--Readonly': readOnly })}
      readOnly={readOnly}
    >
      <Slate editor={editor} value={editorValue} onChange={handlerChangeValueEditor}>
        <div className="RocketSlate__Container">
          {!readOnly && (
            <>
              {renderToolbar && <div className="RocketSlate__Toolbar">{renderToolbar()}</div>}
              {renderBefore && <div className="RocketSlate__EditorBefore">{renderBefore()}</div>}
            </>
          )}
          <RocketSlateEditable
            className="RocketSlate__Editor"
            plugins={slatePlugins}
            placeholder={placeholder}
            readOnly={readOnly}
            {...handlers}
          />
          {!readOnly && renderAfter && <div className="RocketSlate__EditorAfter">{renderAfter()}</div>}
        </div>
      </Slate>
    </RocketSlateWrapper>
  );
};
