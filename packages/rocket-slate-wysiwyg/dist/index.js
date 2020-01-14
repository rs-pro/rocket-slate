"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withWysiwyg", {
  enumerable: true,
  get: function () {
    return _withWysiwyg.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _rocketSlate = require("rocket-slate");

var _slateReact = require("slate-react");

var _slate = require("slate");

var _toolbar = require("@rocket-slate/toolbar");

var _withWysiwyg = _interopRequireDefault(require("./withWysiwyg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _rocketSlate.addElement)("wysisyg", "block-quote", ({
  attributes,
  children
}) => _react.default.createElement("blockquote", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "bulleted-list", ({
  attributes,
  children
}) => _react.default.createElement("ul", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "numbered-list", ({
  attributes,
  children
}) => _react.default.createElement("ol", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "list-item", ({
  attributes,
  children
}) => _react.default.createElement("ol", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "heading-one", ({
  attributes,
  children
}) => _react.default.createElement("h1", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "heading-two", ({
  attributes,
  children
}) => _react.default.createElement("h2", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "heading-three", ({
  attributes,
  children
}) => _react.default.createElement("h3", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "heading-four", ({
  attributes,
  children
}) => _react.default.createElement("h4", attributes, children));
(0, _rocketSlate.addElement)("wysisyg", "heading-five", ({
  attributes,
  children
}) => _react.default.createElement("h5", attributes, children));
(0, _rocketSlate.addLeaf)("wysisyg", "bold", children => _react.default.createElement("strong", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "code", children => _react.default.createElement("strong", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "italic", children => _react.default.createElement("em", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "underline", children => _react.default.createElement("u", null, children));
const LIST_TYPES = ['numbered-list', 'bulleted-list', 'checkbox-list'];

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

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    _slate.Editor.removeMark(editor, format);
  } else {
    _slate.Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = _slate.Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = _slate.Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

const BlockButton = ({
  format,
  icon
}) => {
  const editor = (0, _slateReact.useSlate)();
  return _react.default.createElement(_toolbar.Button, {
    active: isBlockActive(editor, format),
    onMouseDown: event => {
      event.preventDefault();
      toggleBlock(editor, format);
    }
  }, icon);
};

const MarkButton = ({
  format,
  icon
}) => {
  const editor = (0, _slateReact.useSlate)();
  return _react.default.createElement(_toolbar.Button, {
    active: isMarkActive(editor, format),
    onMouseDown: event => {
      event.preventDefault();
      toggleMark(editor, format);
    }
  }, icon);
};
//# sourceMappingURL=index.js.map