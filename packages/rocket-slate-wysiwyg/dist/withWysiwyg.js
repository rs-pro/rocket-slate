"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withWysiwyg;

var _isHotkey = _interopRequireDefault(require("is-hotkey"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withWysiwyg(editor) {
  const {
    onKeyDown
  } = editor;

  editor.onKeyDown = event => {
    for (const hotkey in _util.HOTKEYS) {
      if ((0, _isHotkey.default)(hotkey, event)) {
        event.preventDefault();
        const mark = _util.HOTKEYS[hotkey];
        (0, _util.toggleMark)(editor, mark);
      }
    }

    onKeyDown(event);
  };

  return editor;
}
//# sourceMappingURL=withWysiwyg.js.map