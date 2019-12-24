"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reResizable = require("re-resizable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Image extends _react.default.PureComponent {
  getClasses() {
    const {
      selected
    } = this.props;
    return (0, _classnames.default)("editor__content-image", {
      "editor__content-image--focused": selected
    });
  }

  renderInner() {
    const src = this.getSrc();
    return _react.default.createElement("a", {
      href: src,
      target: "_blank"
    }, _react.default.createElement("img", {
      alt: "",
      src: src,
      ref: r => this.image = r
    }));
  }

  getSrc() {
    const {
      data
    } = this.props.node;
    const src = data.get("src");
    return src;
  }

  getSize() {
    const {
      data
    } = this.props.node;
    const size = {
      width: data.get("width"),
      height: data.get("height")
    };
    return size;
  }

  renderReadonly() {
    const {
      attributes
    } = this.props;
    const size = this.getSize();
    return _react.default.createElement("span", _extends({
      className: this.getClasses()
    }, attributes, {
      style: {
        width: size.width + "px",
        height: size.height + "px"
      }
    }), this.renderInner());
  }

  renderResizer() {
    const {
      attributes
    } = this.props;
    const {
      editor,
      node
    } = this.props;
    const size = this.getSize();
    const src = this.getSrc();
    return _react.default.createElement(_reResizable.Resizable, _extends({
      className: this.getClasses(),
      size: size,
      onResizeStop: (e, direction, ref, d) => {
        const width = this.image.width;
        const height = this.image.height;
        editor.setNodeByKey(node.key, {
          data: {
            src,
            width,
            height
          }
        });
      }
    }, attributes), this.renderInner());
  }

  renderLoading() {
    const {
      attributes
    } = this.props;
    return _react.default.createElement("span", _extends({
      className: this.getClasses()
    }, attributes), "Loading...");
  }

  render() {
    const {
      selected,
      editor
    } = this.props;
    const {
      data
    } = this.props.node;
    const src = data.get("src");

    if (!src) {
      return this.renderLoading();
    }

    if (editor.props.readOnly) {
      return this.renderReadonly();
    }

    return this.renderResizer();
  }

}

var _default = Image;
exports.default = _default;
//# sourceMappingURL=Image.js.map