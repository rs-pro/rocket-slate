import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { onKeyDown } from './onKeyDown';
import { ExitBreakPluginOptions } from './types';

export const RocketSlateBreakExitPlugin = (options: ExitBreakPluginOptions = {}): IRocketSlatePlugin => ({
  plugin: {
    onKeyDown: onKeyDown(options),
  },
});
