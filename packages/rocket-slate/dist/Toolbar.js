"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _slateReact = require("slate-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Toolbar = _react.default.forwardRef((props, ref) => {
  const {
    buttons
  } = props;
  const editor = (0, _slateReact.useSlate)();
  return _react.default.createElement("div", {
    className: "rocket-slate__toolbar",
    ref: ref
  }, buttons.map(button => {
    return _react.default.createElement("a", {
      className: "rocket-slate__toolbar-button"
    });
  }));
});

var _default = Toolbar;
exports.default = _default;
//# sourceMappingURL=Toolbar.js.map