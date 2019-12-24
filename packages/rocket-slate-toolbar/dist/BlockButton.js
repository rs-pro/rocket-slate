"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BlockButton = _react.default.forwardRef((props, ref) => {
  const {
    type,
    icon,
    value,
    hasBlock,
    onClickBlock,
    ...rest
  } = props;
  let isActive = hasBlock(type);

  if (["numbered-list", "bulleted-list"].includes(type)) {
    if (value && value.blocks.size > 0) {
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = hasBlock("list-item") && parent && parent.type === type;
    }
  }

  if (["check-list"].includes(type)) {
    isActive = isActive || hasBlock("check-list-item");
  }

  return _react.default.createElement(_Button.default, _extends({
    ref: ref,
    active: isActive,
    onMouseDown: event => onClickBlock(event, type)
  }, rest), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon
  }));
});

var _default = BlockButton;
exports.default = _default;
//# sourceMappingURL=BlockButton.js.map