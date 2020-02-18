import { MentionPlugin, RenderElementOptions, withMention } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';

const MENTION_ON_CHANGE = new WeakMap();
const MENTION_ON_KEYDOWN = new WeakMap();

const RocketSlateMentionPlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: {
      ...MentionPlugin(options),
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
        const onChangeMention = MENTION_ON_CHANGE.get(editor);
        if (onChangeMention) {
          onChangeMention();
        }
      };
      return withMention(editor);
    },
  };
};

export { RocketSlateMentionPlugin, MENTION_ON_CHANGE, MENTION_ON_KEYDOWN };
