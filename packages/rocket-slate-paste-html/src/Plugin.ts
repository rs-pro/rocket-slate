import { withPasteHtml } from 'slate-plugins-next';
import { IRocketSlatePlugin, withCheckPastSlateFragment } from '@rocket-slate/editor';

export const RocketSlatePastHtmlPlugin = (plugins: IRocketSlatePlugin[]): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      const { insertData } = editor;
      const filteredPlugins = plugins.filter(pluginItem => pluginItem.plugin).map(pluginItem => pluginItem.plugin);
      return withCheckPastSlateFragment(withPasteHtml(filteredPlugins)(editor), insertData);
    },
  };
};
