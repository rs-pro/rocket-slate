import React from 'react'
import { isHotkey } from 'is-hotkey'
const isCodeHotkey = isHotkey('mod+`')

/**
 * Render a Slate block.
 *
 * @param {Object} props
 * @param {Editor} editor
 * @param {Function} next
 * @return {Element}
 */
const renderBlock = (props, editor, next) => {
  const { attributes, children, node, isFocused } = props
  const { data } = node

  switch (node.type) {
    case 'code':
      return (
        <div className="code-block" {...attributes}>
          {children}
        </div>
      );
    case 'code_line':
      return <div {...attributes}>{children}</div>;

    default:
      return next()
  }
}

export default renderBlock
