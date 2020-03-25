import React, { useCallback } from 'react';
import { Editor, Transforms, Range } from 'slate';
import { useSlate } from 'slate-react';
import { MARK_CODE, CODE, PARAGRAPH, isBlockActive } from 'slate-plugins-next';
import { RocketButtonMark, RocketButtonBlock, RocketTooltip } from '@rocket-slate/editor';
import { IconCodeBlock, IconCodeInline } from '@rocket-slate/icons';

export const RocketSlateCodeButton = () => {
  const editor = useSlate();
  const handlerMouseDown = useCallback(
    (event) => {
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
    <RocketTooltip title="Блок кода">
      <RocketButtonBlock format={CODE} icon={<IconCodeBlock />} onMouseDown={handlerMouseDown} />
    </RocketTooltip>
  );
};

export const RocketSlateCodeInlineButton = () => {
  return (
    <RocketTooltip title="Код">
      <RocketButtonMark format={MARK_CODE} icon={<IconCodeInline />} />
    </RocketTooltip>
  );
};
