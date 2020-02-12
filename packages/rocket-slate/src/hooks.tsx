import React, { useMemo } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { IRocketSlatePlugin } from './Editor';

const useEditorWithPlugin = (plugins: IRocketSlatePlugin[]) =>
  useMemo(() => {
    return plugins.reduce((editorWithPlugins, plugin) => {
      if (plugin.withPlugin) {
        return plugin.withPlugin(editorWithPlugins);
      }
      return editorWithPlugins;
    }, withHistory(withReact(createEditor())));
  }, plugins);

const useHandlers = (plugins: IRocketSlatePlugin[], editor: Editor) =>
  useMemo(() => {
    const handlers = plugins.reduce((handlers, plugin) => {
      if (plugin.handlers) {
        return Object.entries(plugin.handlers).reduce((handlers, [handleKey, handleFn]) => {
          if (handlers[handleKey] === undefined) {
            handlers[handleKey] = [];
          }
          handlers[handleKey].push(handleFn);
          return handlers;
        }, handlers);
      }
      return handlers;
    }, {});
    return Object.entries(handlers).reduce((handlers, [handleKey, handleList]: [string, any[]]) => {
      handlers[handleKey] = (event) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < handleList.length; i++) {
          handleList[i](event, editor);
        }
      };
      return handlers;
    }, {});
  }, plugins);

export { useEditorWithPlugin, useHandlers };
