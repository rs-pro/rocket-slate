import isHotkey from 'is-hotkey';
import { toggleMark } from '@rocket-slate/core/util';
import { Editor } from 'slate';

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export default function withWysiwyg(editor: Editor) {
  console.log('withWysiwyg');
  const { onKeyDown } = editor;
  console.log(editor);
  // editor.onKeyDown = (event) => {
  //   console.log('onKeyDown');
  //   for (const hotkey in HOTKEYS) {
  //     if (isHotkey(hotkey, event)) {
  //       event.preventDefault();
  //       const mark = HOTKEYS[hotkey];
  //       toggleMark(editor, mark);
  //     }
  //   }
  //   onKeyDown(event);
  // };
  return editor;
}
