import { withShortcuts, withPasteMd } from 'slate-plugins-next';
import { IRocketSlatePlugin, withCheckPastSlateFragment } from '@rocket-slate/editor';

export const RocketSlateMarkdownShortcutsPlugin = (): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      const editorWithMd = withShortcuts(editor);
      return withShortcuts(editor);
    },
  };
};

export const RocketSlateMarkdownPastePlugin = (plugins: IRocketSlatePlugin[]): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      const { insertData } = editor;
      const filteredPlugins = plugins.filter(pluginItem => pluginItem.plugin).map(pluginItem => pluginItem.plugin);
      return withCheckPastSlateFragment(withPasteMd(filteredPlugins)(editor), insertData);
    },
  };
};
