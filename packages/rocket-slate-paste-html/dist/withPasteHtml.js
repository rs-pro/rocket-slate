"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withPaseteHtml;

var _deserialize = _interopRequireDefault(require("./deserialize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withPaseteHtml(editor) {
  const {
    insertData,
    isInline,
    isVoid
  } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = data => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = (0, _deserialize.default)(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
}
//# sourceMappingURL=withPasteHtml.js.map