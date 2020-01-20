"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMarkActive = exports.isBlockActive = exports.toggleMark = exports.toggleBlock = exports.LIST_TYPES = exports.HOTKEYS = void 0;

var _slate = require("slate");

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};
exports.HOTKEYS = HOTKEYS;
const LIST_TYPES = ['numbered-list', 'bulleted-list', 'checkbox-list'];
exports.LIST_TYPES = LIST_TYPES;

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  _slate.Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  _slate.Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    const block = {
      type: format,
      children: []
    };

    _slate.Transforms.wrapNodes(editor, block);
  }
};

exports.toggleBlock = toggleBlock;

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    _slate.Editor.removeMark(editor, format);
  } else {
    _slate.Editor.addMark(editor, format, true);
  }
};

exports.toggleMark = toggleMark;

const isBlockActive = (editor, format) => {
  const [match] = _slate.Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

exports.isBlockActive = isBlockActive;

const isMarkActive = (editor, format) => {
  const marks = _slate.Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

exports.isMarkActive = isMarkActive;
//# sourceMappingURL=util.js.map