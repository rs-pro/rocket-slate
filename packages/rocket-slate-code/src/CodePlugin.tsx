import { CodePlugin } from 'slate-plugins-next';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';

const RocketSlateCodePlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: CodePlugin(options),
  };
};

export {
  RocketSlateCodePlugin
}
