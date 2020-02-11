import React from 'react';
import isHotkey from 'is-hotkey';

import { toggleMark } from '@rocket-slate/utils';

import IconH1 from './icons/H1';
import IconBold from './icons/Bold';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';

export const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const pluginConfig: IRocketSlatePlugin = {
  name: 'wysiwyg',
  elements: [
    {
      type: 'block-quote',
      renderFn: ({ children, attributes }) => <blockquote {...attributes}>{children}</blockquote>,
    },
    { type: 'bulleted-list', renderFn: ({ children, attributes }) => <ul {...attributes}>{children}</ul> },
    { type: 'numbered-list', renderFn: ({ children, attributes }) => <ol {...attributes}>{children}</ol> },
    { type: 'list-item', renderFn: ({ children, attributes }) => <ol {...attributes}>{children}</ol> },
    { type: 'heading-one', renderFn: ({ children, attributes }) => <h1 {...attributes}>{children}</h1> },
    { type: 'heading-two', renderFn: ({ children, attributes }) => <h2 {...attributes}>{children}</h2> },
    { type: 'heading-three', renderFn: ({ children, attributes }) => <h3 {...attributes}>{children}</h3> },
    { type: 'heading-four', renderFn: ({ children, attributes }) => <h4 {...attributes}>{children}</h4> },
    { type: 'heading-five', renderFn: ({ children, attributes }) => <h5 {...attributes}>{children}</h5> },
    {
      type: 'code',
      renderFn: ({ children, attributes }) => (
        <pre {...attributes}>
          <code>{children}</code>
        </pre>
      ),
    },
  ],
  leaves: [
    { type: 'bold', renderFn: ({ children }) => <b>{children}</b> },
    { type: 'italic', renderFn: ({ children }) => <em>{children}</em> },
    { type: 'underline', renderFn: ({ children }) => <u>{children}</u> },
    { type: 'strikethrough', renderFn: ({ children }) => <u>{children}</u> },
  ],
  buttons: [
    { name: 'bold', type: 'mark', format: 'bold', icon: <IconBold /> },
    { name: 'heading-one', type: 'block', format: 'heading-one', icon: <IconH1 /> },
  ],
  handlers: {
    onKeyDown: (event, editor): void => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event.nativeEvent)) {
          event.preventDefault();
          const mark = HOTKEYS[hotkey];
          toggleMark(editor, mark);
        }
      }
    },
  },
};

export default pluginConfig;
