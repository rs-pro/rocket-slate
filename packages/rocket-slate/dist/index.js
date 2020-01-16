"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapLink = wrapLink;
exports.unwrapLink = unwrapLink;
Object.defineProperty(exports, "addElement", {
  enumerable: true,
  get: function () {
    return _plugins.addElement;
  }
});
Object.defineProperty(exports, "addLeaf", {
  enumerable: true,
  get: function () {
    return _plugins.addLeaf;
  }
});
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function () {
    return _plugins.Element;
  }
});
Object.defineProperty(exports, "Leaf", {
  enumerable: true,
  get: function () {
    return _plugins.Leaf;
  }
});
Object.defineProperty(exports, "elements", {
  enumerable: true,
  get: function () {
    return _plugins.elements;
  }
});
Object.defineProperty(exports, "leaves", {
  enumerable: true,
  get: function () {
    return _plugins.leaves;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.default;
  }
});
Object.defineProperty(exports, "Toolbar", {
  enumerable: true,
  get: function () {
    return _Toolbar.default;
  }
});
Object.defineProperty(exports, "initialEditorState", {
  enumerable: true,
  get: function () {
    return _initialEditorState.default;
  }
});
Object.defineProperty(exports, "Editor", {
  enumerable: true,
  get: function () {
    return _Editor.default;
  }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () {
    return _Tooltip.default;
  }
});

var _plugins = require("./plugins");

var _Button = _interopRequireDefault(require("./Button"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _initialEditorState = _interopRequireDefault(require("./initialEditorState"));

var _Editor = _interopRequireDefault(require("./Editor"));

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