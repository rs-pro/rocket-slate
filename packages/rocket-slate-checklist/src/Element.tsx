import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useEditor, useReadOnly } from 'slate-react';
import { ACTION_ITEM } from './Plugin';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3px 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 6px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
`;

const Text = styled.span<{ checked: boolean }>`
  flex: 1;
  opacity: ${(props) => (props.checked ? 0.666 : 1)};
  text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  &:focus {
    outline: none;
  }
`;

export type ActionItemProps = RenderElementProps & {
  onChange: React.EventHandler<React.ChangeEvent<any>>;
};

export const ActionItemElement: React.FunctionComponent<ActionItemProps> = (props) => {
  const { attributes, children, element, onChange } = props;
  const readOnly = useReadOnly();
  const {
    data: { checked },
  } = element;

  return (
    <Wrapper {...attributes} data-slate-type={ACTION_ITEM}>
      <CheckboxWrapper contentEditable={false}>
        <Checkbox type="checkbox" checked={checked} onChange={onChange} />
      </CheckboxWrapper>
      <Text contentEditable={!readOnly} checked={checked} suppressContentEditableWarning>
        {children}
      </Text>
    </Wrapper>
  );
};
