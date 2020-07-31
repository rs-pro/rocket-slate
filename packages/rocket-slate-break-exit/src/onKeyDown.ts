import { Editor, Point, Range, Transforms, Location, Path, Ancestor, NodeEntry, Node } from 'slate';
import isHotkey from 'is-hotkey';
import { ExitBreakOnKeyDownOptions, QueryOptions, EditorAboveOptions } from './types';

const getBlockAbove = (editor: Editor, options: Omit<EditorAboveOptions, 'match'> = {}): NodeEntry<Ancestor> =>
  Editor.above(editor, {
    match: n => Editor.isBlock(editor, n),
    ...options,
  }) || [editor, []];

const isEnd = (editor: Editor, point: Point | null | undefined, at: Location): boolean =>
  !!point && Editor.isEnd(editor, point, at);

const isStart = (editor: Editor, point: Point | null | undefined, at: Location): boolean =>
  !!point && Editor.isStart(editor, point, at);

const isSelectionAtBlockEnd = (editor: Editor) => {
  const [, path] = getBlockAbove(editor);

  return isEnd(editor, editor.selection?.focus, path);
};

const isSelectionAtBlockStart = (editor: Editor) => {
  const [, path] = getBlockAbove(editor);

  return isStart(editor, editor.selection?.focus, path);
};

const isExpanded = (range?: Range | null) => !!range && Range.isExpanded(range);

const isNodeType = (entry?: NodeEntry<Node>, { filter = () => true, allow = [], exclude = [] }: QueryOptions = {}) => {
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

export const exitBreakAtEdges = (
  editor: Editor,
  {
    start,
    end,
  }: {
    start?: boolean;
    end?: boolean;
  },
) => {
  let queryEdge = false;
  let isEdge = false;
  let isStart = false;
  if (start || end) {
    queryEdge = true;

    if (start && isSelectionAtBlockStart(editor)) {
      isEdge = true;
      isStart = true;
    }

    if (end && isSelectionAtBlockEnd(editor)) {
      isEdge = true;
    }

    if (isEdge && isExpanded(editor.selection)) {
      editor.deleteFragment();
    }
  }

  return {
    queryEdge,
    isEdge,
    isStart,
  };
};

export const onKeyDown = ({
  rules = [{ hotkey: 'mod+enter' }, { hotkey: 'mod+shift+enter', before: true }],
}: ExitBreakOnKeyDownOptions = {}) => (event: KeyboardEvent, editor: Editor) => {
  const entry = getBlockAbove(editor);

  rules.forEach(({ hotkey, query: { start, end, ...query } = {}, level = 1, before, defaultType = 'paragraph' }) => {

    if (isHotkey(hotkey, event) && isNodeType(entry, query)) {

      if (!editor.selection) return;

      const { queryEdge, isEdge, isStart } = exitBreakAtEdges(editor, {
        start,
        end,
      });

      if (isStart) before = true;

      if (queryEdge && !isEdge) return;

      event.preventDefault();

      // пока не работает, должно создавать пустую строку после блока и туда перемещать курсор
      // const selectionPath = Editor.path(editor, editor.selection);
      // let insertPath;
      // if (before) {
      //   insertPath = selectionPath.slice(0, level + 1);
      // } else {
      //   insertPath = Path.next(selectionPath.slice(0, level + 1));
      // }

      Transforms.insertNodes(
        editor,
        { type: defaultType, children: [{ text: '' }] },
        {
          at: Range.start(editor.selection),
          select: !isStart,
        },
      );
    }
  });
};
