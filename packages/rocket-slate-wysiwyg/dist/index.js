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

var _withWysiwyg = _interopRequireDefault(require("./withWysiwyg"));

var _BlockButton = _interopRequireDefault(require("./BlockButton"));

var _MarkButton = _interopRequireDefault(require("./MarkButton"));

var _H = _interopRequireDefault(require("@rocket-slate/icons/H1"));

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
(0, _rocketSlate.addButton)("wysisyg", "heading-one", () => _react.default.createElement(_BlockButton.default, {
  name: "heading-one",
  format: "heading-one",
  icon: _H.default
}));
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
(0, _rocketSlate.addLeaf)("wysisyg", "bold", ({
  attributes,
  children
}) => _react.default.createElement("h5", attributes, children));
(0, _rocketSlate.addButton)("wysisyg", "bold", () => _react.default.createElement(_MarkButton.default, {
  name: "bold",
  format: "bold",
  icon: "format_bold"
}));
(0, _rocketSlate.addLeaf)("wysisyg", "code", children => _react.default.createElement("strong", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "italic", children => _react.default.createElement("em", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "underline", children => _react.default.createElement("u", null, children));
(0, _rocketSlate.addLeaf)("wysisyg", "strikethrough", children => _react.default.createElement("u", null, children));
//# sourceMappingURL=index.js.map