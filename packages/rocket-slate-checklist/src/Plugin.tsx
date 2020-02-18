import { ActionItemPlugin, withBreakEmptyReset, withDeleteStartReset, ACTION_ITEM } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';

const resetOptions = {
  types: [ACTION_ITEM],
};

const RocketSlateChecklistPlugin: (options?: RenderElementOptions) => IRocketSlatePlugin = (options) => ({
  plugin: ActionItemPlugin(options),
  withPlugin: (editor) => {
    return withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor));
  },
});

export { RocketSlateChecklistPlugin };
