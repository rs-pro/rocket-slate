const onKeyDown = (event, editor, next) => {
  if (event.key === 'Enter' && value.startBlock.type === 'code') {
    editor.insertText('\n')
    return
  }
}

export default onKeyDown
