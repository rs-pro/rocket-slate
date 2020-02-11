import React, { useCallback, MouseEvent } from 'react';
import Button from './Button';
import { useSlate } from 'slate-react';
import { t } from '@rocket-slate/i18n';
import { isBlockActive, toggleBlock } from './util';

const ButtonBlock = ({ name, format, icon }) => {
  const editor = useSlate();
  const handlerMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    toggleBlock(editor, format);
  }, []);
  return (
    <Button active={isBlockActive(editor, format)} onMouseDown={handlerMouseDown} title={t(`toolbar.wysiwyg.${name}`)}>
      {icon}
    </Button>
  );
};

export default ButtonBlock;
