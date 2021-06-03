import {
  createDeserializeHTMLPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createLinkPlugin,
  createListPlugin,
  createNodeIdPlugin,
  createReactPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
} from '@udecode/slate-plugins';

import { ELEMENT_PARAGRAPH } from '@udecode/slate-plugins-paragraph';
import { createBlockquotePlugin } from '@udecode/slate-plugins-block-quote';
import { createCodeBlockPlugin } from '@udecode/slate-plugins-code-block';
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/slate-plugins-image';

var plugins = [
  createReactPlugin(),
  createHistoryPlugin(),
  createParagraphPlugin(),
  createBlockquotePlugin(),
  createTodoListPlugin(),
  createHeadingPlugin(),
  createImagePlugin(),
  createLinkPlugin(),
  createListPlugin(),
  createTablePlugin(),
  //createMediaEmbedPlugin(),
  createCodeBlockPlugin(),
  createAlignPlugin(),
  createBoldPlugin(),
  createCodePlugin(),
  createItalicPlugin(),
  createHighlightPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  //createSubscriptPlugin(),
  //createSuperscriptPlugin(),
  createKbdPlugin(),
  createNodeIdPlugin(),
  //createAutoformatPlugin(optionsAutoformat),
  //createResetNodePlugin(optionsResetBlockTypePlugin),
  //createSoftBreakPlugin(optionsSoftBreakPlugin),
  //createExitBreakPlugin(optionsExitBreakPlugin),
  //createNormalizeTypesPlugin({
    //rules: [{ path: [0, 0], strictType: ELEMENT_H1 }],
  //}),
  createTrailingBlockPlugin({
    type: ELEMENT_PARAGRAPH,
    level: 1,
  }),
  createSelectOnBackspacePlugin({ allow: ELEMENT_IMAGE }),
  //mentionPlugin,
];

plugins.push(createDeserializeHTMLPlugin({ plugins }));

export default plugins;
