import React from 'react';
import { RocketButton, RocketTooltip } from '@rocket-slate/core';
import { IconCodeBlock, IconCodeInline } from '@rocket-slate/icons';

export const RocketSlateCodeButton = () => {
  return (
    <RocketTooltip title="Блок кода">
      <RocketButton icon={<IconCodeBlock />} />
    </RocketTooltip>
  );
};

export const RocketSlateCodeInlineButton = () => {
  return (
    <RocketTooltip title="Код">
      <RocketButton icon={<IconCodeInline />} />
    </RocketTooltip>
  );
};
