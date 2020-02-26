import React from 'react';
import { useSlate } from 'slate-react';
import { MARK_CODE, CODE } from 'slate-plugins-next';
import { RocketButtonMark, RocketButtonBlock, RocketTooltip } from '@rocket-slate/core';
import { IconCodeBlock, IconCodeInline } from '@rocket-slate/icons';

export const RocketSlateCodeButton = () => {
  const editor = useSlate();
  return (
    <RocketTooltip title="Блок кода">
      <RocketButtonBlock format={CODE} icon={<IconCodeBlock />} />
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
