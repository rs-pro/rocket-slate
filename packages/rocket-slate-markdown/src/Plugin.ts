import { withShortcuts, withPasteMd } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';

export const RocketSlateMarkdownShortcutsPlugin = (): IRocketSlatePlugin => {
  return {
    withPlugin: editor => withShortcuts(editor),
  };
};

export const RocketSlateMarkdownPastePlugin = (plugins: IRocketSlatePlugin[]): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      const filteredPlugins = plugins.filter(pluginItem => pluginItem.plugin).map(pluginItem => pluginItem.plugin);
      return withPasteMd(filteredPlugins)(editor);
    },
  };
};
