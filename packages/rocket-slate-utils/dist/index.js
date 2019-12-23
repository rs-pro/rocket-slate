export { default as Tooltip } from './Tooltip';
/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 */

export function wrapLink(editor, href) {
  editor.wrapInline({
    type: "link",
    data: {
      href
    }
  });
  editor.moveToEnd();
}
/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

export function unwrapLink(editor) {
  editor.unwrapInline("link");
}