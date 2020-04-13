import { IRocketSlatePlugin } from '@rocket-slate/editor/Editor';
import { withTable, TablePlugin } from 'slate-plugins-next';

export const RocketSlateTablePlugin = (): IRocketSlatePlugin => {
  return {
    withPlugin: (editor) => withTable(editor),
    plugin: TablePlugin(),
  };
};
