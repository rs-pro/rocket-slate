import React, { useMemo } from 'react';
import { createEditor, Editor } from 'slate';
import { IRocketSlatePlugin } from './Editor';
import { withBlock } from 'slate-plugins-next';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

const useEditorWithPlugin = (plugins: IRocketSlatePlugin[]) =>
  useMemo(() => {
    return plugins.reduce(<T extends Editor>(editorWithPlugins: T, plugin): T => {
      if (plugin.withPlugin) {
        return plugin.withPlugin(editorWithPlugins);
      }
      return editorWithPlugins;
    }, withBlock(withHistory(withReact(createEditor()))));
  }, plugins);

const useHandlers = <T extends Editor>(plugins: IRocketSlatePlugin[], editor: T) =>
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
