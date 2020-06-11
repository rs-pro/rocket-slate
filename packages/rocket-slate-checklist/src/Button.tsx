import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { isBlockActive, PARAGRAPH } from 'slate-plugins-next';
import { RocketButtonBlock } from '@rocket-slate/editor';
import { IconCheckList } from '@rocket-slate/icons';
import { ACTION_ITEM } from './Element';

const RocketSlateChecklistButton: React.FC<{ className?: string; icon?: React.ReactNode }> = ({ className, icon }) => {
  const editor = useSlate();
  const handlerMouseDown = useCallback(
    event => {
      event.preventDefault();
      const isActive = isBlockActive(editor, ACTION_ITEM);
      Transforms.setNodes(editor, {
        type: isActive ? PARAGRAPH : ACTION_ITEM,
        data: {
          checked: false,
        },
      });
    },
    [editor],
  );
  return (
    <RocketButtonBlock
      className={className}
      title={editor.getLocale('checklist.btns.add')}
      format={ACTION_ITEM}
      icon={icon || <IconCheckList />}
      onMouseDown={handlerMouseDown}
    />
  );
};

export { RocketSlateChecklistButton };
