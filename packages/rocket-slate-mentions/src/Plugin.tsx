import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { MentionPlugin, withMention, MENTION } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { MENTION_ON_CHANGE, MENTION_ON_KEYDOWN } from './events';

const MentionWrap = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

const MentionElement = styled.span<{ selected: boolean; focused: boolean }>`
  display: inline-block;
  padding: 3px 10px 2px;
  margin: 0 1px;
  vertical-align: middle;
  border-radius: 4px;
  background-color: #eee;
  box-shadow: ${props => (props.selected && props.focused ? '0 0 0 2px #B4D5FF' : 'none')};
`;

const Mention = ({
  selected,
  focused,
  element: {
    children: [{ text }],
  },
}) => (
  <MentionElement selected={selected} focused={focused}>
    {text}
  </MentionElement>
);

type MentionComponentProps = RenderElementProps & {
  selected: boolean;
  focused: boolean;
};

type MentionOptionsElementOptions = {
  component: React.ComponentType<MentionComponentProps>;
};

const RocketSlateMentionElement = (props: RenderElementProps & MentionOptionsElementOptions) => {
  const { attributes, children } = props;
  const { component: ComponentMention, ...restProps } = props;
  const selected = useSelected();
  const focused = useFocused();
  return (
    <MentionWrap
      {...attributes}
      data-slate-type={MENTION}
      contentEditable={false}
      className="RocketSlateMentionElement"
    >
      <ComponentMention {...restProps} attributes={attributes} selected={selected} focused={focused} />
      {children}
    </MentionWrap>
  );
};

const RocketSlateMentionPlugin = (options?: {
  component?: React.ComponentType<MentionComponentProps>;
}): IRocketSlatePlugin => {
  const MentionComponent = props => (
    <RocketSlateMentionElement {...props} component={(options && options.component) || Mention} />
  );
  return {
    plugin: {
      ...MentionPlugin({
        component: MentionComponent,
      }),
      onKeyDown: (e, editor) => {
        const onKeyDownMention = MENTION_ON_KEYDOWN.get(editor);
        if (onKeyDownMention) {
          onKeyDownMention(e, editor);
        }
      },
    },
    withPlugin: editor => {
      const { onChange } = editor;
      editor.onChange = () => {
        onChange();
        ReactDOM.unstable_batchedUpdates(() => {
          const onChangeMention = MENTION_ON_CHANGE.get(editor);
          if (onChangeMention) {
            onChangeMention();
          }
        });
      };
      return withMention(editor);
    },
  };
};

export { RocketSlateMentionPlugin };
