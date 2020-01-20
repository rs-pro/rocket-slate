"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _rocketSlate = require("rocket-slate");

var _slateReact = require("slate-react");

var _i18n = require("@rocket-slate/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BlockButton = ({
  name,
  format,
  icon
}) => {
  const editor = (0, _slateReact.useSlate)();
  return _react.default.createElement(_rocketSlate.Button, {
    active: isBlockActive(editor, format),
    onMouseDown: event => {
      event.preventDefault();
      toggleBlock(editor, format);
    },
    title: (0, _i18n.t)(`toolbar.wysiwyg.${name}`)
  }, icon);
};

var _default = BlockButton;
exports.default = _default;
//# sourceMappingURL=BlockButton.js.map