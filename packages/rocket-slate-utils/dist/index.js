"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapLink = wrapLink;
exports.unwrapLink = unwrapLink;
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () {
    return _Tooltip.default;
  }
});

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: {
      href
    }
  });
  editor.moveToEnd();
}

function unwrapLink(editor) {
  editor.unwrapInline("link");
}
//# sourceMappingURL=index.js.map