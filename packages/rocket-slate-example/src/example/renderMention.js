export default function renderMention({data}) {
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
}
