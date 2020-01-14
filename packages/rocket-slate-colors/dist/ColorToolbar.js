"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react2 = _interopRequireDefault(require("@tippy.js/react"));

var _colors = _interopRequireDefault(require("./colors"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _faFill = require("@fortawesome/free-solid-svg-icons/faFill");

var _faPalette = require("@fortawesome/free-solid-svg-icons/faPalette");

var _slateReact = require("slate-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Default = {
  fg: "#000000",
  bg: "#ffffff"
};
const Names = {
  fg: "Цвет текста",
  bg: "Цвет фона"
};
const Icons = {
  fg: _faPalette.faPalette,
  bg: _faFill.faFill
};
const Other = {
  fg: 'bg',
  bg: 'fg'
};

class ColorToolbar extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fg: false,
      bg: false
    };
  }

  toggle(kind) {
    var toSet = {};

    if (this.state[kind]) {
      toSet[kind] = false;
      this.setState(toSet);
      return;
    }

    if (this.has(kind)) {
      let removed = this.remove(kind);

      if (removed) {
        toSet[kind] = false;
      } else {
        toSet[kind] = true;
      }
    } else {
      toSet[kind] = !this.state[kind];
    }

    if (toSet[kind]) {
      toSet[Other[kind]] = false;
    }

    this.setState(toSet);
  }

  has(kind) {
    const {
      value
    } = this.props.editorState;
    return value.marks.some(mark => mark.type === kind + '_color');
  }

  remove(kind) {
    const {
      editor,
      editorState: {
        value
      }
    } = this.props;
    const {
      selection
    } = value;

    if (this.has(kind) && selection.isExpanded) {
      var removed = false;
      value.marks.filter(mark => mark.type === kind + '_color').forEach(mark => {
        editor.removeMark(mark);
        removed = true;
      });
      return removed;
    }

    return false;
  }

  setColor(kind, color) {
    const {
      editor,
      editorState: {
        value
      }
    } = this.props;
    this.remove(kind);

    if (color !== Default[kind]) {
      editor.addMark({
        type: kind + '_color',
        data: {
          color
        }
      }).focus();
    }

    var toSet = {};
    toSet[kind] = false;
    this.setState(toSet);
  }

  renderColor(kind) {
    const cl = (0, _classnames.default)("editor__button", {
      "editor__button--active": this.has(kind)
    });
    return _react.default.createElement("div", {
      className: "editor__color-group"
    }, _react.default.createElement(_react2.default, {
      content: Names[kind]
    }, _react.default.createElement("a", {
      className: cl,
      onClick: () => this.toggle(kind)
    }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: Icons[kind]
    }))), this.state[kind] ? _react.default.createElement("div", {
      className: "editor__color-dropdown"
    }, _colors.default.map(color => {
      return _react.default.createElement("span", {
        key: color,
        className: "editor__color",
        style: {
          backgroundColor: color
        },
        onClick: () => this.setColor(kind, color)
      });
    })) : null);
  }

  render() {
    return _react.default.createElement("div", {
      key: "tbg7",
      className: "editor__toolbar-group"
    }, this.renderColor('fg'), this.renderColor('bg'));
  }

}

function _default() {
  const editor = (0, _slateReact.useSlate)();
  return _react.default.createElement(ColorToolbar, {
    editor: editor
  });
}

;
//# sourceMappingURL=ColorToolbar.js.map