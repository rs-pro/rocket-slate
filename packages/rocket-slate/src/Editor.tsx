import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Transforms } from 'slate';
import { Slate, ReactEditor } from 'slate-react';
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

// eslint-disable-next-line react/display-name
const RocketSlateEditor = React.forwardRef<any, IRocketSlateEditorProps>(
  (
    {
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
    },
    ref,
  ) => {
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

    const handlerChangeValueEditor = useCallback(
      value => {
        setValue(value);
        if (onChange) {
          onChange(value);
        }
      },
      [setValue, onChange],
    );

    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref({
            editor,
          });
        }
        if (typeof ref === 'object' && ref.current) {
          // eslint-disable-next-line no-param-reassign
          ref.current = {
            editor,
          };
        }
      }
    });

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
  },
);

export class RocketSlate extends React.Component<IRocketSlateEditorProps> {
  refEditor: any = null;

  getRefEditor = ref => {
    this.refEditor = ref;
  };

  focus() {
    if (this.refEditor) {
      ReactEditor.focus(this.refEditor.editor);
    }
  }

  blur() {
    if (this.refEditor) {
      Transforms.select(this.refEditor.editor, [0]);
      ReactEditor.blur(this.refEditor.editor);
    }
  }

  render() {
    return <RocketSlateEditor {...this.props} ref={this.getRefEditor} />;
  }
}
