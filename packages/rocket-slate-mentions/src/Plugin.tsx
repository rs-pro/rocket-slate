import React from 'react';
import ReactDOM from 'react-dom';
import { MentionPlugin, withMention, MENTION } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { RenderElementProps, useFocused, useSelected } from 'slate-react';
import { MENTION_ON_CHANGE, MENTION_ON_KEYDOWN } from './events';

// TODO: https://github.com/ianstormtaylor/slate/issues/3518

const RocketSlateMentionElement = (props: RenderElementProps) => {
  const { attributes, children, element: { children: [{ text }] } } = props;
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      data-slate-type={MENTION}
      contentEditable={false}
      style={{
        padding: '3px 10px 2px',
        margin: '0 1px',
        verticalAlign: 'middle',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      {text}
      {children}
    </span>
  );
};

const RocketSlateMentionPlugin = (options?: {
  component?: React.ComponentType<RenderElementProps>;
}): IRocketSlatePlugin => {
  return {
    plugin: {
      ...MentionPlugin({
        component: RocketSlateMentionElement,
        ...options,
      }),
      onKeyDown: (e, editor) => {
        const onKeyDownMention = MENTION_ON_KEYDOWN.get(editor);
        if (onKeyDownMention) {
          onKeyDownMention(e, editor);
        }
      },
    },
    withPlugin: (editor) => {
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
