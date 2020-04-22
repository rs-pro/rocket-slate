import { Editor } from 'slate';
import merge from 'lodash/merge';
import get from 'lodash/get';
import has from 'lodash/has';
import { I18n } from './types';

export type LocaleEditor = Editor & {
  addLocale: (locals: I18n) => void;
  setLocale: (local: string) => void;
  getLocale: (keyPath: string) => string;
};

export const withLocale = <T extends Editor>(editor: T): T & LocaleEditor => {
  let locale = 'en';
  let i18n: I18n = {};

  const editorWithLocale = editor as T & LocaleEditor;

  editorWithLocale.addLocale = (locals: I18n) => {
    i18n = merge(i18n, locals);
  };

  editorWithLocale.setLocale = (local: string) => {
    locale = local;
  };

  editorWithLocale.getLocale = (keyPath: string) => {
    const path = `${locale}.${keyPath}`;
    if (!has(i18n, path)) {
      console.error(`Missing message: "${keyPath}" for locale '${locale}'`);
    }
    return get(i18n, `${locale}.${keyPath}`, keyPath) as string;
  };

  return editor as T & LocaleEditor;
};
