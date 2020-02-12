import React from 'react';
import { Range } from 'slate';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { BlockquotePlugin, BoldPlugin, HeadingPlugin, ItalicPlugin, ListPlugin } from 'slate-plugins-next';
import { DeserializeHtml } from 'slate-plugins-next/dist/paste-html/types';

enum WysiwygPluginTypes {
  BLOCKQUOTE = 'blockquote',
  BOLD = 'bold',
  HEADING = 'heading',
  ITALIC = 'italic',
  LIST = 'list',
}

const WysiwygPlugins = {
  [WysiwygPluginTypes.BLOCKQUOTE]: BlockquotePlugin,
  [WysiwygPluginTypes.BOLD]: BoldPlugin,
  [WysiwygPluginTypes.HEADING]: HeadingPlugin,
  [WysiwygPluginTypes.ITALIC]: ItalicPlugin,
  [WysiwygPluginTypes.LIST]: ListPlugin,
};

type WysiwygPluginsWithParams =
  | [WysiwygPluginTypes.BLOCKQUOTE, Parameters<typeof BlockquotePlugin>[0]]
  | [WysiwygPluginTypes.BOLD, Parameters<typeof BoldPlugin>[0]]
  | [WysiwygPluginTypes.HEADING, Parameters<typeof HeadingPlugin>[0]]
  | [WysiwygPluginTypes.ITALIC, Parameters<typeof ItalicPlugin>[0]]
  | [WysiwygPluginTypes.LIST, Parameters<typeof ListPlugin>[0]];

const RocketWysiwygPlugin = (
  plugins: Array<WysiwygPluginTypes | WysiwygPluginsWithParams> = [
    WysiwygPluginTypes.BLOCKQUOTE,
    WysiwygPluginTypes.BOLD,
    WysiwygPluginTypes.HEADING,
    WysiwygPluginTypes.ITALIC,
    WysiwygPluginTypes.LIST,
  ],
): IRocketSlatePlugin => {
  const pluginsInitialized = plugins.map((option) => {
    if (Array.isArray(option)) {
      return WysiwygPlugins[option[0]](option[1]);
    }
    return WysiwygPlugins[option]();
  });
  return {
    plugin: {
      onDOMBeforeInput: (event, editor) => {
        pluginsInitialized.forEach(({ onDOMBeforeInput }) => {
          if (onDOMBeforeInput) {
            onDOMBeforeInput(event, editor);
          }
        });
      },
      decorate: (entry) => {
        let ranges: Range[] = [];
        pluginsInitialized.forEach(({ decorate }) => {
          if (decorate) {
            const newRanges = decorate(entry) || [];
            if (newRanges.length) {
              ranges = [...ranges, ...newRanges];
            }
          }
        });
        return ranges;
      },
      renderElement: (props) => {
        let element;
        pluginsInitialized.some(({ renderElement }) => {
          element = renderElement && renderElement(props);
          return !!element;
        });
        if (element) {
          return element;
        }
        return undefined;
      },
      renderLeaf: (props) => {
        pluginsInitialized.forEach(({ renderLeaf }) => {
          if (renderLeaf) {
            props.children = renderLeaf(props);
          }
        });
        return props.children;
      },
      onKeyDown: (event, editor) => {
        pluginsInitialized.forEach(({ onKeyDown }) => {
          if (onKeyDown) {
            onKeyDown(event, editor);
          }
        });
      },
      deserialize: pluginsInitialized.reduce((deserializeAll, plugin) => {
        return {
          element:
            (plugin.deserialize &&
              plugin.deserialize.element &&
              Object.entries(plugin.deserialize.element).reduce((elements, [elName, elFn]: [any, any]) => {
                if (elements[elName]) {
                  elements[elName] = (el) => ({
                    ...elements[elName](el),
                    ...elFn(el),
                  });
                } else {
                  elements[elName] = elFn;
                }
                return elements;
              }, deserializeAll.element || {})) ||
            deserializeAll.element,
          leaf:
            (plugin.deserialize &&
              plugin.deserialize.leaf &&
              Object.entries(plugin.deserialize.leaf).reduce((leaf, [elName, elFn]: [any, any]) => {
                if (leaf[elName]) {
                  leaf[elName] = (el) => ({
                    ...leaf[elName](el),
                    ...elFn(el),
                  });
                } else {
                  leaf[elName] = elFn;
                }
                return leaf;
              }, deserializeAll.leaf || {})) ||
            deserializeAll.leaf,
        };
        // tslint:disable-next-line:no-object-literal-type-assertion
      }, {} as DeserializeHtml),
    },
  };
};

export { RocketWysiwygPlugin };
