import React from 'react';
import { ACTION_ITEM } from 'slate-plugins-next';
import { RocketButtonBlock, RocketTooltip } from '@rocket-slate/core';
import IconChecklist from './IconCheckList';

const RocketSlateChecklistButton = () => (
  <RocketTooltip title="Чек-лист">
    <RocketButtonBlock format={ACTION_ITEM} icon={<IconChecklist />} />
  </RocketTooltip>
);

export { RocketSlateChecklistButton };
