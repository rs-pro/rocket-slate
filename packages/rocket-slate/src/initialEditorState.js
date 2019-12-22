const initialEditorState = {
  document: {
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        nodes: [
          { kind: 'text', leaves: [{text: ''}] },
        ]
      }
    ]
  }
}

export default initialEditorState
