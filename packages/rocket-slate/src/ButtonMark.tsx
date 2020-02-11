import React, { useCallback, MouseEvent } from 'react';
import { useSlate } from 'slate-react';
import Button from './Button';
import { t } from '@rocket-slate/i18n';
import { isMarkActive, toggleMark } from './util';

const ButtonMark = ({ name, format, icon }) => {
  const editor = useSlate();
  const handlerMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    toggleMark(editor, format);
  }, []);
  return (
    <Button active={isMarkActive(editor, format)} onMouseDown={handlerMouseDown} title={t(`toolbar.wysiwyg.${name}`)}>
      {icon}
    </Button>
  );
};

export default ButtonMark;
