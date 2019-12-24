const onKeyDown = (event, editor, next) => {
  const { value } = editor

  if (event.key === 'Enter' && (value.startBlock.type === 'image' || value.startBlock.type === "file") ) {
    editor.splitBlock().setBlocks('paragraph')
    return
  }
}

export default onKeyDown
