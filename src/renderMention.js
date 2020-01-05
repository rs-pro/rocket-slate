import React from 'react';

export default function renderMention({data}) {
  const issueID = data.get('issue')
  const isFocused = false
  const attributes = {}
  return (
    <span
      className="editor__content-issue"
      selected={isFocused}
      contentEditable={false}
      {...attributes}
    >
      {issueID}
    </span>
  )
}
