/**
 * Slate custom wysiwyg plugin
 */

import React from 'react'

// Custom blocks
import CheckListItem from "./CheckListItem"
import Image from "./Image"

import classNames from "classnames"
import prettyBytes from 'pretty-bytes';

/**
 * Define hotkey matchers.editor
 *
 * @type {Function}
 */
import { isHotkey } from 'is-hotkey'
const isBoldHotkey = isHotkey('mod+b')
const isItalicHotkey = isHotkey('mod+i')
const isUnderlinedHotkey = isHotkey('mod+u')
const isStrikeHotkey = isHotkey('mod+s')
const isCodeHotkey = isHotkey('mod+`')
const isChecklistHotkey = isHotkey('mod+m')
const isH1Hotkey = isHotkey('mod+1')
const isH2Hotkey = isHotkey('mod+2')
const isH3Hotkey = isHotkey('mod+3')
const isQuoteHotkey = isHotkey('mod+q')

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

  //console.log("block", node.type)

  switch (node.type) {
    case 'code':
      return (
        <div className="code-block" {...attributes}>
          {children}
        </div>
      );
    case 'code_line':
      return <div {...attributes}>{children}</div>;

    case 'check-list-item':
      return <CheckListItem {...props} />

    case 'link':
      const href = data.get('href')
      return (
        <a {...attributes} href={href} target="_blank" rel="nofollow noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          {children}
        </a>
      )

    case 'mention':
      const userID = data.get('user')
      return (
        <span
          className={classNames("editor__content-mention", {"editor__content-mention--focused": isFocused})}
          contentEditable={false}
          {...attributes}
        >
          <UserLabel id={userID} />
        </span>
      )


    case 'issue':
      const issueID = data.get('issue')
      return (
        <span
          className="editor__content-issue"
          selected={isFocused}
          contentEditable={false}
          {...attributes}
        >
          <IssueLabel id={issueID} />
        </span>
      )

    case 'file':
      return (
        <a
          className={classNames("editor__content-file", {"editor__content-file--focused": isFocused})}
          contentEditable={false}
          href={data.get('url')}
          target="_blank"
          rel="nofollow noopener noreferrer"
          {...attributes}
        >
          {data.get('name')} ({prettyBytes(data.get("size"))})
          {children}
        </a>
      )

    case 'image':
      return <Image selected={isFocused} {...props} />
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'div':
      return <div {...attributes}>{children}</div>
    default:
      return next()
  }
}

const renderInline = (props, editor, next) => {
  const { attributes, children, node, isFocused } = props
  const { data } = node

  //console.log("inline", node.type)

  switch (node.type) {
    case 'link':
      const href = data.get('href')
      return (
        <a {...attributes} href={href} target="_blank" rel="nofollow noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          {children}
        </a>
      )

    case 'mention':
      const userID = data.get('user')
      return (
        <span
          className={classNames("editor__content-mention", {"editor__content-mention--focused": isFocused})}
          contentEditable={false}
          {...attributes}
        >
          <UserLabel id={userID} />
        </span>
      )


    case 'issue':
      const issueID = data.get('issue')
      return (
        <span
          className="editor__content-issue"
          selected={isFocused}
          contentEditable={false}
          {...attributes}
        >
          <IssueLabel id={issueID} />
        </span>
      )

    case 'file':
      return (
        <a
          className={classNames("editor__content-file", {"editor__content-file--focused": isFocused})}
          contentEditable={false}
          href={data.get('url')}
          target="_blank"
          rel="nofollow noopener noreferrer"
          {...attributes}
        >
          {data.get('name')} ({prettyBytes(data.get("size"))})
          {children}
        </a>
      )

    case 'image':
      return <Image selected={isFocused} {...props} />
    default:
      return next()
  }
}

/**
 * Render a Slate mark.
 *
 * @param {Object} props
 * @param {Editor} editor
 * @param {Function} next
 * @return {Element}
 */
const renderMark = (props, editor, next) => {
  const { children, mark, attributes } = props

  //console.log("render mark", mark)

  switch (mark.type) {
    case 'fg_color':
      const color = mark.data.get("color")
      return <span style={{color}} className="inline-fg-color" {...attributes}>{children}</span>

    case 'bg_color':
      const backgroundColor = mark.data.get("color")
      return <span style={{backgroundColor}} className="inline-fg-color" {...attributes}>{children}</span>

    case 'code':
      return <span className="inline-code" {...attributes}>{children}</span>
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'strikethrough':
      return <s {...attributes}>{children}</s>
    default:
      return next()
  }
}

/**
 * On key down, check for our specific key shortcuts.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

const onKeyDown = (event, editor, next) => {
  let mark
  const { value } = editor

  if (event.key === 'Enter' && value.startBlock.type === 'code') {
    editor.insertText('\n')
    return
  }

  if (event.key === 'Enter' && (value.startBlock.type === 'image' || value.startBlock.type === "file") ) {
    editor.splitBlock().setBlocks('paragraph')
    return
  }

  if (isChecklistHotkey(event)) {
    return this.toolbar.onClickBlock(event, "check-list")
  }
  if (isH1Hotkey(event)) {
    return this.toolbar.onClickBlock(event, "heading-one")
  }
  if (isH2Hotkey(event)) {
    return this.toolbar.onClickBlock(event, "heading-two")
  }
  if (isH3Hotkey(event)) {
    return this.toolbar.onClickBlock(event, "heading-three")
  }
  if (isQuoteHotkey(event)) {
    return this.toolbar.onClickBlock(event, "block-quote")
  }

  if (isBoldHotkey(event)) {
    mark = 'bold'
  } else if (isItalicHotkey(event)) {
    mark = 'italic'
  } else if (isUnderlinedHotkey(event)) {
    mark = 'underlined'
  } else if (isStrikeHotkey(event)) {
    mark = 'strikethrough'
  } else if (isCodeHotkey(event)) {
    mark = 'code'
  } else {
    if (event.key == 'Enter' && value.startBlock.type == 'check-list-item') {
      if (value.selection.isCollapsed && value.selection.start.offset == 0 && value.endText.text == "") {
        editor.setBlocks('paragraph')
        return
      }
      // Если у нас открыты порталы, отдаем событие им
      if (editor.props.portals.mentionOpen || editor.props.portals.issueOpen) {
        return next()
      } else {
        editor.splitBlock().setBlocks({ data: { checked: false } })
        return
      }
    }

    if (
      event.key == 'Backspace' &&
      value.selection.isCollapsed &&
      value.startBlock.type == 'check-list-item' &&
      value.selection.start.offset == 0
    ) {
      //console.log("switch to p")
      editor.setBlocks('paragraph')
      return
    }

    //console.log("next", next)

    return next()
  }

  event.preventDefault()
  editor.toggleMark(mark)
}

function PluginWysiwyg(opts = {}) {
  return { onKeyDown, renderBlock, renderInline, renderMark }
}

export default PluginWysiwyg
