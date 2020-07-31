import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { onKeyDownSoftBreak } from './onKeyDown';
import { SoftBreakPluginOptions } from './types';

export const RocketSlateBreakSoftPlugin = (options: SoftBreakPluginOptions = {}): IRocketSlatePlugin => ({
  plugin: {
    onKeyDown: onKeyDownSoftBreak(options),
  },
});
