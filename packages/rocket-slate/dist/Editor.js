"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("@rocket-slate/plugin-image");

var _rocketSlate = require("rocket-slate");

var _pasteHtml = require("@rocket-slate/paste-html");

var _slate = require("slate");

var _slateHistory = require("slate-history");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Editor extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue
    };
  }

  render() {
    const renderElement = useCallback(props => _react.default.createElement(Element, props), []);
    const renderLeaf = useCallback(props => _react.default.createElement(Leaf, props), []);
    const editor = useMemo(() => (0, _pasteHtml.withHtml)(withReact((0, _pasteHtml.withHtml)((0, _slateHistory.withHistory)((0, _slate.createEditor)())))), []);
    return _react.default.createElement(Slate, {
      editor: editor,
      value: value,
      onChange: value => setValue(value)
    }, _react.default.createElement(Editable, {
      renderElement: renderElement,
      renderLeaf: renderLeaf,
      placeholder: "Paste in some HTML..."
    }));
  }

}

exports.default = Editor;
//# sourceMappingURL=Editor.js.map