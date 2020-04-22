import React, { useCallback } from 'react';
import { useEditor } from 'slate-react';
import { RocketButton, RocketTooltip } from '@rocket-slate/editor';
import { IconImage } from '@rocket-slate/icons';
import { insertImage } from './Plugin';

const RocketSlateButtonImage = () => {
  const editor = useEditor();
  const handlerMouseDown = useCallback(event => {
    event.preventDefault();
    const url = window.prompt(editor.getLocale('image.msg.add_url'));
    if (!url) {
      return;
    }
    insertImage(editor, { src: url });
  }, []);
  return (
    <RocketTooltip title={editor.getLocale('image.btns.add')}>
      <RocketButton icon={<IconImage />} onMouseDown={handlerMouseDown} />
    </RocketTooltip>
  );
};

export { RocketSlateButtonImage };
