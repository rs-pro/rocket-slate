"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLinks = void 0;

var _react = _interopRequireDefault(require("react"));

var _rocketSlate = require("rocket-slate");

var _isUrl = _interopRequireDefault(require("is-url"));

var _slate = require("slate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

(0, _rocketSlate.addElement)("link", "link", ({
  attributes,
  children,
  element
}) => _react.default.createElement("a", _extends({}, attributes, {
  href: element.url
}), children));

const withLinks = editor => {
  const {
    insertData,
    insertText,
    isInline
  } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = text => {
    if (text && (0, _isUrl.default)(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text && (0, _isUrl.default)(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

exports.withLinks = withLinks;

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = editor => {
  const [link] = _slate.Editor.nodes(editor, {
    match: n => n.type === 'link'
  });

  return !!link;
};

const unwrapLink = editor => {
  _slate.Transforms.unwrapNodes(editor, {
    match: n => n.type === 'link'
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const {
    selection
  } = editor;

  const isCollapsed = selection && _slate.Range.isCollapsed(selection);

  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{
      text: url
    }] : []
  };

  if (isCollapsed) {
    _slate.Transforms.insertNodes(editor, link);
  } else {
    _slate.Transforms.wrapNodes(editor, link, {
      split: true
    });

    _slate.Transforms.collapse(editor, {
      edge: 'end'
    });
  }
};
//# sourceMappingURL=index.js.map