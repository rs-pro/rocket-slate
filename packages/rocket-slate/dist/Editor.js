"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rocketSlate = require("rocket-slate");

var _wysiwyg = require("@rocket-slate/wysiwyg");

var _pasteHtml = require("@rocket-slate/paste-html");

var _mentions = require("@rocket-slate/mentions");

var _links = require("@rocket-slate/links");

var _table = require("@rocket-slate/table");

var _slateReact = require("slate-react");

var _slate = require("slate");

var _slateHistory = require("slate-history");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Editor(props) {
  console.log(_rocketSlate.initialEditorState);
  const [value, setValue] = (0, _react.useState)(props.initialValue || _rocketSlate.initialEditorState);
  const renderElement = (0, _react.useCallback)(props => _react.default.createElement(_rocketSlate.Element, props), []);
  const renderLeaf = (0, _react.useCallback)(props => _react.default.createElement(_rocketSlate.Leaf, props), []);
  const editor = (0, _react.useMemo)(() => {
    let editor = (0, _slateHistory.withHistory)((0, _slate.createEditor)());
    editor = (0, _slateReact.withReact)((0, _pasteHtml.withPasteHtml)((0, _table.withTables)((0, _wysiwyg.withWysiwyg)((0, _links.withLinks)((0, _mentions.withMentions)(editor))))));
    return editor;
  }, []);
  console.log("render slate", editor, value);
  return _react.default.createElement(_slateReact.Slate, {
    editor: editor,
    value: value,
    onChange: value => setValue(value)
  }, _react.default.createElement(_slateReact.Editable, {
    renderElement: renderElement,
    renderLeaf: renderLeaf,
    placeholder: "Paste in some HTML..."
  }));
}

var _default = Editor;
exports.default = _default;
//# sourceMappingURL=Editor.js.map