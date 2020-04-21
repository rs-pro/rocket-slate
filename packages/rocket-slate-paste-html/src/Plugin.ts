import { withPasteHtml } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';

export const RocketSlatePastHtmlPlugin = (plugins: IRocketSlatePlugin[]): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      const filteredPlugins = plugins.filter(pluginItem => pluginItem.plugin).map(pluginItem => pluginItem.plugin);
      return withPasteHtml(filteredPlugins)(editor);
    },
  };
};
