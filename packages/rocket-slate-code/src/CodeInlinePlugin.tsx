import { InlineCodePlugin } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { InlineCodePluginOptions } from 'slate-plugins-next/dist/marks/inline-code/types';

const RocketSlateCodeInlinePlugin = (options?: InlineCodePluginOptions): IRocketSlatePlugin => {
  return {
    plugin: InlineCodePlugin(options),
  };
};

export { RocketSlateCodeInlinePlugin };
