import isHotkey from 'is-hotkey';
import { HOTKEYS } from "./util";

import {
  toggleMark,
} from "./util"

export default function withWysiwyg(editor) {
  const { onKeyDown } = editor;
  editor.onKeyDown= event => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault()
        const mark = HOTKEYS[hotkey]
        toggleMark(editor, mark)
      }
    }
    onKeyDown(event)
  }
  return editor
}
  