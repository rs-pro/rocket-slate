"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = _interopRequireDefault(require("@tippy.js/react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tooltip extends _react.default.PureComponent {
  render() {
    return _react.default.createElement(_react2.default, {
      content: this.props.title
    }, this.props.children);
  }

}

exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map