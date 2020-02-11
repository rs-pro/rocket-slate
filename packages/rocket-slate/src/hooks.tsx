import React, { useMemo } from 'react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { IRocketSlatePlugin } from './Editor';

const useElements = (plugins: IRocketSlatePlugin[]) =>
  useMemo(() => {
    return plugins.reduce((elements, plugin) => {
      if (!plugin.elements) {
        return elements;
      }
      return plugin.elements.reduce((elements, { type, renderFn }) => {
        if (elements[type] && elements[type].pluginName !== plugin.name) {
          throw new Error(
            `Error: cannot register element ${type} from ${plugin.name} - already registered by ${elements[type].pluginName}`,
          );
        }
        elements[type] = {
          pluginName: plugin.name,
          renderFn,
        };
        return elements;
      }, elements);
    }, {});
  }, plugins);

const useLeaves = (plugins: IRocketSlatePlugin[]) =>
  useMemo(() => {
    return plugins.reduce((leaves, plugin) => {
      if (!plugin.leaves) {
        return leaves;
      }
      return plugin.leaves.reduce((leaves, { type, renderFn }) => {
        if (leaves[type] && leaves[type].pluginName !== plugin.name) {
          throw new Error(
            `Error: cannot register leaf ${type} from ${plugin.name} - already registered by ${leaves[type].pluginName}`,
          );
        }
        leaves[type] = {
          pluginName: plugin.name,
          renderFn,
        };
        return leaves;
      }, leaves);
    }, {});
  }, plugins);

const useEditorWithPlugin = (plugins: IRocketSlatePlugin[]) =>
  useMemo(() => {
    return withReact(
      plugins.reduce((editorWithPlugins, plugin) => {
        if (plugin.withHOC) {
          return plugin.withHOC(editorWithPlugins);
        }
        return editorWithPlugins;
      }, withHistory(createEditor())),
    );
  }, plugins);

const useButtons = (plugins: IRocketSlatePlugin[]) =>
  useMemo(
    () =>
      plugins.reduce((buttons, plugins) => {
        return [...buttons, ...plugins.buttons];
      }, []),
    plugins,
  );

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

export { useElements, useLeaves, useEditorWithPlugin, useButtons, useHandlers };
