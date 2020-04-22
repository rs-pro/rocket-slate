import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { withTable, TablePlugin } from 'slate-plugins-next';

import local from './locales';

export const RocketSlateTablePlugin = (): IRocketSlatePlugin => {
  return {
    withPlugin: editor => {
      editor.addLocale(local);
      return withTable(editor);
    },
    plugin: TablePlugin(),
  };
};
