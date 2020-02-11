import React from 'react';

import { addElement } from '@rocket-slate/core';

addElement('tables', 'table', ({ attributes, children }) => (
  <table {...attributes}>
    <tbody>{children}</tbody>
  </table>
));
addElement('tables', 'table-row', ({ attributes, children }) => <tr {...attributes}>{children}</tr>);
addElement('tables', 'table-cell', ({ attributes, children }) => <td {...attributes}>{children}</td>);

export { default as withTables } from './withTables';
export { default as TableToolbar } from './TableToolbar';
