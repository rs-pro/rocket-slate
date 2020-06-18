import React from 'react';
import { Range } from 'slate';
import { IResetOption, IRocketSlatePlugin } from '@rocket-slate/editor';
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
  BLOCKQUOTE as BQ,
  withBreakEmptyReset,
  withDeleteStartReset,
  MARK_STRIKETHROUGH,
  getElement,
} from 'slate-plugins-next';
import { DeserializeHtml } from 'slate-plugins-next/dist/deserializers/types';
import locals from './locales';

enum WysiwygPluginTypes {
  BLOCKQUOTE = 'blockquote',
  BOLD = 'bold',
  HEADING = 'heading',
  ITALIC = 'italic',
  LIST = 'list',
  STRIKETHROUGH = 'strikethrough',
  UNDERLINE = 'underline',
}

type StrikePluginOption = {
  renderLeaf: (any) => React.ReactNode;
  deserialize: any;
};

export const WysiwygPlugins = {
  [WysiwygPluginTypes.BLOCKQUOTE]: BlockquotePlugin,
  [WysiwygPluginTypes.BOLD]: BoldPlugin,
  [WysiwygPluginTypes.HEADING]: HeadingPlugin,
  [WysiwygPluginTypes.ITALIC]: ItalicPlugin,
  [WysiwygPluginTypes.LIST]: ListPlugin,
  [WysiwygPluginTypes.STRIKETHROUGH]: (
    options?: StrikethroughPluginOptions,
    overridePluginOptions?: StrikePluginOption,
  ) => {
    const strikePlugin = StrikethroughPlugin(options);
    const overridePlugin = {
      renderLeaf: ({ children, leaf }) => {
        if (leaf[MARK_STRIKETHROUGH]) {
          return <s>{children}</s>;
        }
        return children;
      },
      ...overridePluginOptions,
    };
    return {
      ...strikePlugin,
      ...overridePlugin,
    };
  },
  [WysiwygPluginTypes.UNDERLINE]: UnderlinePlugin,
};

export type WysiwygPluginsWithParams =
  | [WysiwygPluginTypes.BLOCKQUOTE, RenderElementOptions]
  | [WysiwygPluginTypes.BOLD, BoldPluginOptions]
  | [WysiwygPluginTypes.HEADING, HeadingPluginOptions]
  | [WysiwygPluginTypes.ITALIC, ItalicPluginOptions]
  | [WysiwygPluginTypes.LIST, RenderElementListOptions]
  | [WysiwygPluginTypes.STRIKETHROUGH, StrikethroughPluginOptions]
  | [WysiwygPluginTypes.UNDERLINE, UnderlinePluginOptions];

const resetOptions: IResetOption = {
  types: [BQ],
};

const RocketWysiwygPlugin = (
  plugins: Array<WysiwygPluginTypes | WysiwygPluginsWithParams> = [
    WysiwygPluginTypes.BLOCKQUOTE,
    WysiwygPluginTypes.BOLD, // hotkey = 'mod+b'
    [
      WysiwygPluginTypes.HEADING,
      {
        H1: getElement('h1'),
        H2: getElement('h2'),
        H3: getElement('h3'),
        H4: getElement('h4'),
        H5: getElement('h5'),
        H6: getElement('h6'),
      },
    ],
    WysiwygPluginTypes.ITALIC, // hotkey = 'mod+i'
    WysiwygPluginTypes.LIST,
    WysiwygPluginTypes.STRIKETHROUGH, // hotkey = 'mod+shift+k'
    WysiwygPluginTypes.UNDERLINE, // hotkey = 'mod+u'
  ],
): IRocketSlatePlugin => {
  const pluginsInitialized = [
    ParagraphPlugin({
      component: getElement('p'),
    }),
    ...plugins.map(option => {
      if (Array.isArray(option)) {
        return WysiwygPlugins[option[0]](option[1]);
      }
      return WysiwygPlugins[option]();
    }),
  ];
  return {
    withPlugin: editor => {
      editor.addLocale(locals);
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
      decorate: entry => {
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
      renderElement: props => {
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
      renderLeaf: props => {
        const newProps = pluginsInitialized.reduce((accProps, { renderLeaf }) => {
          if (renderLeaf) {
            return {
              ...accProps,
              children: renderLeaf(accProps),
            };
          }
          return accProps;
        }, props);
        return newProps.children;
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
                return {
                  ...elements,
                  [elName]: elements[elName]
                    ? el => ({
                        ...elements[elName](el),
                        ...elFn(el),
                      })
                    : elFn,
                };
              }, deserializeAll.element || {})) ||
            deserializeAll.element,
          leaf:
            (plugin.deserialize &&
              plugin.deserialize.leaf &&
              Object.entries(plugin.deserialize.leaf).reduce((leaf, [elName, elFn]: [any, any]) => {
                return {
                  ...leaf,
                  [elName]: leaf[elName]
                    ? el => ({
                        ...leaf[elName](el),
                        ...elFn(el),
                      })
                    : elFn,
                };
              }, deserializeAll.leaf || {})) ||
            deserializeAll.leaf,
        };
      }, {} as DeserializeHtml),
    },
  };
};

export { RocketWysiwygPlugin };
