import React, { useCallback } from 'react';
import { Editor, Transforms, Range } from 'slate';
import { useSlate } from 'slate-react';
import { MARK_CODE, CODE, PARAGRAPH, isBlockActive } from 'slate-plugins-next';
import { RocketButtonMark, RocketButtonBlock, RocketTooltip } from '@rocket-slate/editor';
import { IconCodeBlock, IconCodeInline } from '@rocket-slate/icons';

export const RocketSlateCodeButton: React.FC<{ className?: string; icon?: React.ReactNode }> = ({
  className,
  icon,
}) => {
  const editor = useSlate();
  const handlerMouseDown = useCallback(
    event => {
      event.preventDefault();
      if (isBlockActive(editor, CODE)) {
        Transforms.setNodes(editor, { type: PARAGRAPH });
      } else {
        const { selection } = editor;
        if (selection) {
          let text = '';
          if (!Range.isCollapsed(selection)) {
            text = Editor.string(editor, selection);
          }
          Transforms.insertNodes(editor, { type: CODE, children: [{ text }] });
          Transforms.insertNodes(editor, { type: PARAGRAPH, children: [{ text: '' }] });
        }
      }
    },
    [editor],
  );
  return (
    <RocketTooltip title={editor.getLocale('code.btns.block')}>
      <RocketButtonBlock
        className={className}
        format={CODE}
        icon={icon || <IconCodeBlock />}
        onMouseDown={handlerMouseDown}
      />
    </RocketTooltip>
  );
};

export const RocketSlateCodeInlineButton: React.FC<{ className?: string; icon?: React.ReactNode }> = ({
  className,
  icon,
}) => {
  const editor = useSlate();
  return (
    <RocketTooltip title={editor.getLocale('code.btns.inline')}>
      <RocketButtonMark className={className} format={MARK_CODE} icon={icon || <IconCodeInline />} />
    </RocketTooltip>
  );
};
