import React, { useCallback } from 'react';
import { useEditor } from 'slate-react';
import { RocketButton } from '@rocket-slate/editor';
import { IconImage } from '@rocket-slate/icons';
import { insertImage } from './Plugin';

const RocketSlateButtonImage: React.FC<{ className?: string; icon?: React.ReactNode }> = ({ className, icon }) => {
  const editor = useEditor();
  const handlerMouseDown = useCallback(event => {
    event.preventDefault();
    const url = window.prompt(editor.getLocale('image.msg.add_url'));
    if (!url) {
      return;
    }
    insertImage(editor, { src: url, title: url });
  }, []);
  return (
    <RocketButton
      title={editor.getLocale('image.btns.add')}
      className={className}
      icon={icon || <IconImage />}
      onMouseDown={handlerMouseDown}
    />
  );
};

export { RocketSlateButtonImage };
