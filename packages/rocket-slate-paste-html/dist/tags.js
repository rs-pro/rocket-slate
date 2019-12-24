"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TEXT_TAGS = exports.ELEMENT_TAGS = void 0;
const ELEMENT_TAGS = {
  A: el => ({
    type: 'link',
    url: el.getAttribute('href')
  }),
  BLOCKQUOTE: () => ({
    type: 'quote'
  }),
  H1: () => ({
    type: 'heading-one'
  }),
  H2: () => ({
    type: 'heading-two'
  }),
  H3: () => ({
    type: 'heading-three'
  }),
  H4: () => ({
    type: 'heading-four'
  }),
  H5: () => ({
    type: 'heading-five'
  }),
  H6: () => ({
    type: 'heading-six'
  }),
  IMG: el => ({
    type: 'image',
    url: el.getAttribute('src')
  }),
  LI: () => ({
    type: 'list-item'
  }),
  OL: () => ({
    type: 'numbered-list'
  }),
  P: () => ({
    type: 'paragraph'
  }),
  PRE: () => ({
    type: 'code'
  }),
  UL: () => ({
    type: 'bulleted-list'
  })
};
exports.ELEMENT_TAGS = ELEMENT_TAGS;
const TEXT_TAGS = {
  CODE: () => ({
    code: true
  }),
  DEL: () => ({
    strikethrough: true
  }),
  EM: () => ({
    italic: true
  }),
  I: () => ({
    italic: true
  }),
  S: () => ({
    strikethrough: true
  }),
  STRONG: () => ({
    bold: true
  }),
  U: () => ({
    underline: true
  })
};
exports.TEXT_TAGS = TEXT_TAGS;
//# sourceMappingURL=tags.js.map