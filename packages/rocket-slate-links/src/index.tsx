import React from 'react';
import { withLink, LinkPlugin, RenderElementOptions, ToolbarLink } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { RocketButtonBlock, RocketTooltip, withBaseStyleButton, withButtonRef } from '@rocket-slate/core';

const RocketSlateLinksPlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: LinkPlugin(options),
    withPlugin: (editor) => {
      return withLink(editor);
    },
  };
};

const RocketSlateLinksButtonWrap = withButtonRef(withBaseStyleButton(ToolbarLink));

const RocketSlateLinksButton = () => (
  <RocketTooltip title="Добавить ссылку">
    <RocketSlateLinksButtonWrap />
  </RocketTooltip>
)

export { RocketSlateLinksPlugin, RocketSlateLinksButton };
