"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Button = _react.default.forwardRef((props, ref) => {
  const {
    active,
    children,
    className,
    ...rest
  } = props;
  const cl = (0, _classnames.default)("editor__button", className, {
    "editor__button--active": active
  });
  return _react.default.createElement("a", _extends({
    tabIndex: -1,
    ref: ref,
    className: cl
  }, rest), children);
});

var _default = Button;
exports.default = _default;
//# sourceMappingURL=Button.js.map