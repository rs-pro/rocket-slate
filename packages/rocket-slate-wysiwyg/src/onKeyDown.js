/**
 * On key down, check for our specific key shortcuts.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}
const onKeyDown = (event, editor, next) => {
  let mark
  const { value } = editor

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

export default onKeyDown
