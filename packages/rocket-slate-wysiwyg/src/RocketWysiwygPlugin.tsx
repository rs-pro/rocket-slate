import React from 'react';
import { Range } from 'slate';
import { IResetOption, IRocketSlatePlugin} from '@rocket-slate/editor';
import {
  ParagraphPlugin,
  BlockquotePlugin,
  BoldPlugin,
  HeadingPlugin,
  ItalicPlugin,
  ListPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
  RenderElementOptions,
  BoldPluginOptions,
  HeadingPluginOptions,
  ItalicPluginOptions,
  RenderElementListOptions,
  StrikethroughPluginOptions,
  UnderlinePluginOptions,
  withList,
  BLOCKQUOTE,
  withBreakEmptyReset,
  withDeleteStartReset,
} from 'slate-plugins-next';
import { DeserializeHtml } from 'slate-plugins-next/dist/paste-html/types';

enum WysiwygPluginTypes {
  BLOCKQUOTE = 'blockquote',
  BOLD = 'bold',
  HEADING = 'heading',
  ITALIC = 'italic',
  LIST = 'list',
  STRIKETHROUGH = 'strikethrough',
  UNDERLINE = 'underline',
}

const WysiwygPlugins = {
  [WysiwygPluginTypes.BLOCKQUOTE]: BlockquotePlugin,
  [WysiwygPluginTypes.BOLD]: BoldPlugin,
  [WysiwygPluginTypes.HEADING]: HeadingPlugin,
  [WysiwygPluginTypes.ITALIC]: ItalicPlugin,
  [WysiwygPluginTypes.LIST]: ListPlugin,
  [WysiwygPluginTypes.STRIKETHROUGH]: StrikethroughPlugin,
  [WysiwygPluginTypes.UNDERLINE]: UnderlinePlugin,
};

type WysiwygPluginsWithParams =
  | [WysiwygPluginTypes.BLOCKQUOTE, RenderElementOptions]
  | [WysiwygPluginTypes.BOLD, BoldPluginOptions]
  | [WysiwygPluginTypes.HEADING, HeadingPluginOptions]
  | [WysiwygPluginTypes.ITALIC, ItalicPluginOptions]
  | [WysiwygPluginTypes.LIST, RenderElementListOptions]
  | [WysiwygPluginTypes.STRIKETHROUGH, StrikethroughPluginOptions]
  | [WysiwygPluginTypes.UNDERLINE, UnderlinePluginOptions];

const resetOptions: IResetOption = {
  types: [BLOCKQUOTE],
};

const RocketWysiwygPlugin = (
  plugins: Array<WysiwygPluginTypes | WysiwygPluginsWithParams> = [
    WysiwygPluginTypes.BLOCKQUOTE,
    WysiwygPluginTypes.BOLD,
    WysiwygPluginTypes.HEADING,
    WysiwygPluginTypes.ITALIC,
    WysiwygPluginTypes.LIST,
    WysiwygPluginTypes.STRIKETHROUGH,
    WysiwygPluginTypes.UNDERLINE,
  ],
): IRocketSlatePlugin => {
  const pluginsInitialized = [
    ParagraphPlugin(),
    ...plugins.map((option) => {
      if (Array.isArray(option)) {
        return WysiwygPlugins[option[0]](option[1]);
      }
      return WysiwygPlugins[option]();
    }),
  ];
  return {
    withPlugin: (editor) => {
      return withList(withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor)));
    },
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
