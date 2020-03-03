import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { ACTION_ITEM, isBlockActive, PARAGRAPH } from 'slate-plugins-next';
import { RocketButtonBlock, RocketTooltip } from '@rocket-slate/core';
import { IconCheckList } from '@rocket-slate/icons';

const RocketSlateChecklistButton = () => {
  const editor = useSlate();
  const handlerMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      const isActive = isBlockActive(editor, ACTION_ITEM);
      Transforms.setNodes(editor, {
        type: isActive ? PARAGRAPH : ACTION_ITEM,
        checked: false,
      });
    },
    [editor],
  );
  return (
    <RocketTooltip title="Чек-лист">
      <RocketButtonBlock format={ACTION_ITEM} icon={<IconCheckList />} onMouseDown={handlerMouseDown} />
    </RocketTooltip>
  );
};

export { RocketSlateChecklistButton };
