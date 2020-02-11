export {
  elements,
  addElement,
  Element,
  leaves,
  addLeaf,
  Leaf,
  buttons,
  addButton,
} from './plugins';

export { default as Button } from './Button';
export { default as Toolbar } from './Toolbar';
export { default as initialValue } from './initialValue';
export { default as Editor } from './Editor';

export { default as Tooltip } from './Tooltip';

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 */
export function wrapLink(editor, href) {
  editor.wrapInline({
    type: 'link',
    data: { href },
  });

  editor.moveToEnd();
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

export function unwrapLink(editor) {
  editor.unwrapInline('link');
}
