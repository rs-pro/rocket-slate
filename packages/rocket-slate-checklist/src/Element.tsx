import React, { useCallback } from 'react';
import styled from 'styled-components';
import { RenderElementProps, useReadOnly } from 'slate-react';

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

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
`;

const Text = styled.span<{ checked: boolean }>`
  flex: 1;
  opacity: ${props => (props.checked ? 0.666 : 1)};
  text-decoration: ${props => (props.checked ? 'line-through' : 'none')};
  &:focus {
    outline: none;
  }
`;

export const ACTION_ITEM = 'check-list-item';

export type RocketSlateChecklistItemProps = Omit<RenderElementProps, 'children'> & {
  onChange?: (boolean) => void;
  checkbox?: React.ComponentType;
};

export const RocketSlateChecklistItem: React.FunctionComponent<RocketSlateChecklistItemProps> = props => {
  const { attributes, children, element, onChange, checkbox: Checkbox = CheckboxInput } = props;
  const readOnly = useReadOnly();
  const {
    data: { checked },
  } = element;

  const handlerChange = useCallback(
    e => {
      if (onChange) {
        onChange(e.target.checked);
      }
    },
    [onChange],
  );

  return (
    <Wrapper className="RocketSlateActionItem" {...attributes} data-slate-type={ACTION_ITEM}>
      <CheckboxWrapper className="RocketSlateActionItem__CheckBoxWrap" contentEditable={false}>
        <Checkbox
          className="RocketSlateActionItem__CheckBox"
          type="checkbox"
          checked={checked}
          onChange={handlerChange}
        />
      </CheckboxWrapper>
      <Text
        className="RocketSlateActionItem__Text"
        contentEditable={!readOnly}
        checked={checked}
        suppressContentEditableWarning
      >
        {children}
      </Text>
    </Wrapper>
  );
};
