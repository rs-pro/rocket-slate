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

export const ActionItemElement: React.FunctionComponent<RenderElementProps> = (props) => {
  const { attributes, children, element } = props;
  const editor = useEditor();
  const readOnly = useReadOnly();
  const { data: { checked } } = element;

  const handlerChangeChecked = useCallback(
    (e) => {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, { data: { checked: e.target.checked } }, { at: path });
    },
    [editor, checked],
  );

  return (
    <Wrapper {...attributes} data-slate-type={ACTION_ITEM}>
      <CheckboxWrapper contentEditable={false}>
        <Checkbox type="checkbox" checked={checked} onChange={handlerChangeChecked} />
      </CheckboxWrapper>
      <Text contentEditable={!readOnly} checked={checked} suppressContentEditableWarning>
        {children}
      </Text>
    </Wrapper>
  );
};
