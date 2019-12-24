"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deserialize;

var _tags = require("./tags");

var _slateHyperscript = require("slate-hyperscript");

function deserialize(el) {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const {
    nodeName
  } = el;
  let parent = el;

  if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    parent = el.childNodes[0];
  }

  const children = Array.from(parent.childNodes).map(deserialize).flat();

  if (el.nodeName === 'BODY') {
    return (0, _slateHyperscript.jsx)('fragment', {}, children);
  }

  if (_tags.ELEMENT_TAGS[nodeName]) {
    const attrs = _tags.ELEMENT_TAGS[nodeName](el);

    return (0, _slateHyperscript.jsx)('element', attrs, children);
  }

  if (_tags.TEXT_TAGS[nodeName]) {
    const attrs = _tags.TEXT_TAGS[nodeName](el);

    return children.map(child => (0, _slateHyperscript.jsx)('text', attrs, child));
  }

  return children;
}
//# sourceMappingURL=deserialize.js.map