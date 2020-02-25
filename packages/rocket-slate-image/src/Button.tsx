import React, { useCallback } from 'react';
import { useEditor } from 'slate-react';
import { RocketButton, RocketTooltip } from '@rocket-slate/core';
import { IconImage } from '@rocket-slate/icons';
import { insertImage } from './Plugin';

const RocketSlateButtonImage = () => {
  const editor = useEditor();
  const handlerMouseDown = useCallback((event) => {
    event.preventDefault();
    const url = window.prompt('Enter the URL of the image:');
    if (!url) {
      return;
    }
    insertImage(editor, { src: url });
  }, []);
  return (
    <RocketTooltip title="Добавить изображение">
      <RocketButton icon={<IconImage />} onMouseDown={handlerMouseDown} />
    </RocketTooltip>
  );
};

export { RocketSlateButtonImage };
