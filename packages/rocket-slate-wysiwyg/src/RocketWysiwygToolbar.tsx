import React from 'react';
import { Toolbar } from 'slate-plugins-next';
import styled from 'styled-components';

const RocketWysiwygToolbar = styled(Toolbar)`
  padding: 10px;
  height: auto;
  border-bottom: 2px solid #ccc;
  > * + * {
    margin-left: 0;
  }
`;
const RocketWysiwygToolbarGroup = styled.div`
  padding: 0 10px;
  border-right: 1px solid #ccc;
`;

export { RocketWysiwygToolbar, RocketWysiwygToolbarGroup };
