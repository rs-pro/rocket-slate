import React from 'react';
import { useSlate } from 'slate-react';
import { MARK_CODE, CODE } from 'slate-plugins-next';
import { RocketButtonMark, RocketButtonBlock } from '@rocket-slate/editor';
import { IconCodeBlock, IconCodeInline } from '@rocket-slate/icons';

export const RocketSlateCodeButton: React.FC<{ className?: string; icon?: React.ReactNode }> = ({
  className,
  icon,
}) => {
  const editor = useSlate();
  return (
    <RocketButtonBlock
      title={editor.getLocale('code.btns.block')}
      className={className}
      format={CODE}
      icon={icon || <IconCodeBlock />}
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
