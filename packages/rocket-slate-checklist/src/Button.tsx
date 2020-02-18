import React from 'react';
import { ACTION_ITEM } from 'slate-plugins-next';
import { RocketButtonBlock, RocketTooltip } from '@rocket-slate/core';
import { IconCheckList } from '@rocket-slate/icons';

const RocketSlateChecklistButton = () => (
  <RocketTooltip title="Чек-лист">
    <RocketButtonBlock format={ACTION_ITEM} icon={<IconCheckList />} />
  </RocketTooltip>
);

export { RocketSlateChecklistButton };
