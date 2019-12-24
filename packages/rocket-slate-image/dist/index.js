"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withImage = withImage;

var _react = _interopRequireDefault(require("react"));

var _Image = _interopRequireDefault(require("./Image"));

var _onKeyDown = _interopRequireDefault(require("./onKeyDown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

addElement("wysisyg", "image", ({
  attributes,
  children
}) => {
  return _react.default.createElement(_Image.default, attributes);
});

function withImage(editor) {}
//# sourceMappingURL=index.js.map