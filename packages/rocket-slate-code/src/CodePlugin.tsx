import { CODE, CodePlugin, withBreakEmptyReset, withDeleteStartReset } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';

const resetOptions = {
  types: [CODE],
};

export const RocketSlateCodePlugin = (options?: any): IRocketSlatePlugin => {
  return {
    plugin: {
      ...CodePlugin(options),
    },
    withPlugin: editor => {
      return withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor));
    },
  };
};
