import React from 'react';

const RenderMention = ({ data }) => {
  const issueID = data.get('issue');
  const isFocused = false;
  const attributes = {};
  return (
    <span
      className="editor__content-issue"
      contentEditable={false}
      data-selected={isFocused}
      {...attributes}
    >
      {issueID}
    </span>
  );
};

export default RenderMention;
