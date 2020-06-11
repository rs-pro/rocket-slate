import React, { useCallback } from 'react';
import { Editor, Transforms, Range } from 'slate';
import { useSlate } from 'slate-react';
import { MARK_CODE, CODE, PARAGRAPH, isBlockActive } from 'slate-plugins-next';
import { RocketButtonMark, RocketButtonBlock } from '@rocket-slate/editor';
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
          if (!Range.isCollapsed(selection)) {
            const text = Editor.string(editor, selection);
            Transforms.insertNodes(editor, { type: CODE, children: [{ text }] });
            Transforms.insertNodes(editor, { type: PARAGRAPH, children: [{ text: '' }] });
          } else {
            Transforms.setNodes(editor, { type: CODE });
            Transforms.insertNodes(editor, { type: PARAGRAPH, children: [{ text: '' }] });
          }
        }
      }
    },
    [editor],
  );
  return (
    <RocketButtonBlock
      title={editor.getLocale('code.btns.block')}
      className={className}
      format={CODE}
      icon={icon || <IconCodeBlock />}
      onMouseDown={handlerMouseDown}
    />
  );
};

export const RocketSlateCodeInlineButton: React.FC<{
  className?: string;
  icon?: React.ReactNode;
  titleHotkey?: string;
}> = ({ className, icon, titleHotkey }) => {
  const editor = useSlate();
  return (
    <RocketButtonMark
      title={editor.getLocale('code.btns.inline')}
      titleHotkey={titleHotkey}
      className={className}
      format={MARK_CODE}
      icon={icon || <IconCodeInline />}
    />
  );
};
