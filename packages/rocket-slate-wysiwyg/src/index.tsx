import React from 'react';
import { addElement, addLeaf, addButton } from '@rocket-slate/core';

export { default as withWysiwyg } from './withWysiwyg';

import IconH1 from './icons/H1';
import IconBold from './icons/Bold';

addElement('wysiwyg', 'block-quote', ({ children, attributes }) => <blockquote {...attributes}>{children}</blockquote>);
addElement('wysiwyg', 'bulleted-list', ({ children, attributes }) => <ul {...attributes}>{children}</ul>);
addElement('wysiwyg', 'numbered-list', ({ children, attributes }) => <ol {...attributes}>{children}</ol>);
addElement('wysiwyg', 'list-item', ({ children, attributes }) => <ol {...attributes}>{children}</ol>);

addElement('wysiwyg', 'heading-one', ({ children, attributes }) => <h1 {...attributes}>{children}</h1>);
addElement('wysiwyg', 'heading-two', ({ children, attributes }) => <h2 {...attributes}>{children}</h2>);
addElement('wysiwyg', 'heading-three', ({ children, attributes }) => <h3 {...attributes}>{children}</h3>);
addElement('wysiwyg', 'heading-four', ({ children, attributes }) => <h4 {...attributes}>{children}</h4>);
addElement('wysiwyg', 'heading-five', ({ children, attributes }) => <h5 {...attributes}>{children}</h5>);
addElement('wysiwyg', 'code', ({ children, attributes }) => <pre {...attributes}><code>{children}</code></pre>);

addLeaf('wysiwyg', 'bold', ({ children }) => <b>{children}</b>);
addLeaf('wysiwyg', 'italic', ({ children }) => <em>{children}</em>);
addLeaf('wysiwyg', 'underline', ({ children }) => <u>{children}</u>);
addLeaf('wysiwyg', 'strikethrough', ({ children }) => <u>{children}</u>);

addButton('wysiwyg', 'bold', { type: 'mark', format: 'bold', icon: <IconBold /> });
addButton('wysiwyg', 'heading-one', { type: 'block', format: 'heading-one', icon: <IconH1 /> });
