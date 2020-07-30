import React from 'react';
import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { SlatePlugin, ToggleBlockEditor } from 'slate-plugins-next';

export type LocaleEditor = Editor & {
  addLocale: (locals: I18n) => void;
  setLocale: (local: string) => void;
  getLocale: (keyPath: string) => string;
};

export type eventList = Required<
  Omit<React.DOMAttributes<HTMLDivElement>, 'children' | 'dangerouslySetInnerHTML' | 'onKeyDown'>
>;

export interface IRocketSlatePlugin {
  plugin?: SlatePlugin;
  withPlugin?: <T extends Editor & ReactEditor & HistoryEditor & ToggleBlockEditor & LocaleEditor>(editor: T) => T;
  handlers?: {
    [eventName in keyof eventList]: (
      event: Required<React.DOMAttributes<HTMLDivElement>>[eventName] extends (...args: any) => any
        ? Parameters<Required<React.DOMAttributes<HTMLDivElement>>[eventName]>[0]
        : never,
      editor: Editor,
    ) => void | undefined;
  };
}

export interface IResetOption {
  types: string[];
  onUnwrap?: any;
}

export type I18n = {
  [key in string]: string | I18n;
};

export interface IRocketSlateEditorProps {
  [key: string]: any;
  value: Node[];
  plugins?: IRocketSlatePlugin[];
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  onChange?: (value: Node[]) => void;
  renderBefore?: () => React.ReactNode;
  renderAfter?: () => React.ReactNode;
  renderToolbar?: () => React.ReactNode;
  locale?: string;
  i18n?: I18n;
}
