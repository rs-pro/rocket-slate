"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const onKeyDown = (event, editor, next) => {
  const {
    value
  } = editor;

  if (event.key === 'Enter' && (value.startBlock.type === 'image' || value.startBlock.type === "file")) {
    editor.splitBlock().setBlocks('paragraph');
    return;
  }
};

var _default = onKeyDown;
exports.default = _default;
//# sourceMappingURL=onKeyDown.js.map