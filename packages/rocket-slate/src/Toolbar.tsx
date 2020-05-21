import { Toolbar } from 'slate-plugins-next';
import styled from 'styled-components';

const RocketToolbar = styled(Toolbar)`
  height: auto;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  > * + * {
    margin-left: 0;
  }
`;
const RocketToolbarGroup = styled.div`
  padding: 5px;
  margin-bottom: -1px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;

export { RocketToolbar, RocketToolbarGroup };
