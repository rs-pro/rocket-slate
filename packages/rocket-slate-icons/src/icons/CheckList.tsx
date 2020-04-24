import * as React from 'react';

function SvgCheckList(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path d="M19.7 6.8h-2.8V4.3c0-.9-.7-1.6-1.6-1.6h-11c-.9 0-1.6.7-1.6 1.6v11c0 .9.7 1.6 1.6 1.6h2.5v2.8c0 .9.7 1.6 1.6 1.6h11.3c.9 0 1.6-.7 1.6-1.6V8.4c0-.9-.7-1.6-1.6-1.6zM6.8 8.4v6.9H4.3v-11h11v2.5H8.4c-.9 0-1.6.7-1.6 1.6zm10.1 5.3l-1.6 1.6-.1.1-1.6 1.6-1.2 1.2-1.2-1.2-2.8-3 1.1-1.1 2.4 2.4.5.5 2.9-2.9 1.6-1.6 1.7-1.7 1.1 1.2-2.8 2.9z" />
    </svg>
  );
}

export default SvgCheckList;
