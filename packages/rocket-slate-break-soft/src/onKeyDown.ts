import { Editor, Ancestor, NodeEntry, Node } from 'slate';
import isHotkey from 'is-hotkey';
import { SoftBreakOnKeyDownOptions, QueryOptions, EditorAboveOptions } from './types';

export const isNodeType = (
  entry?: NodeEntry<Node>,
  { filter = () => true, allow = [], exclude = [] }: QueryOptions = {},
) => {
  let filterAllow: typeof filter = () => true;
  if (allow.length) {
    filterAllow = ([n]) => allow.includes(n.type as string);
  }

  let filterExclude: typeof filter = () => true;
  if (exclude.length) {
    filterExclude = ([n]) => !exclude.includes(n.type as string);
  }

  return !!entry && filter(entry) && filterAllow(entry) && filterExclude(entry);
};

export const getBlockAbove = (editor: Editor, options: Omit<EditorAboveOptions, 'match'> = {}): NodeEntry<Ancestor> =>
  Editor.above(editor, {
    match: n => Editor.isBlock(editor, n),
    ...options,
  }) || [editor, []];

export const onKeyDownSoftBreak = ({ rules = [{ hotkey: 'shift+enter' }] }: SoftBreakOnKeyDownOptions = {}) => (
  event: KeyboardEvent,
  editor: Editor,
) => {
  const entry = getBlockAbove(editor);

  rules.forEach(({ hotkey, query }) => {
    if (isHotkey(hotkey, event) && isNodeType(entry, query)) {
      event.preventDefault();

      editor.insertText('\n');
    }
  });
};
