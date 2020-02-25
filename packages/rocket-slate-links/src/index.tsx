import React from 'react';
import { withLink, LinkPlugin, RenderElementOptions, ToolbarLink } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { RocketTooltip, withBaseStyleButton, withButtonRef } from '@rocket-slate/core';
import { IconLink } from '@rocket-slate/icons';

const RocketSlateLinksPlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: LinkPlugin(options),
    withPlugin: withLink,
  };
};

const RocketSlateLinksButtonWrap = withButtonRef(withBaseStyleButton(ToolbarLink));

const RocketSlateLinksButton = () => (
  <RocketTooltip title="Добавить ссылку">
    <RocketSlateLinksButtonWrap icon={<IconLink />} />
  </RocketTooltip>
);

export { RocketSlateLinksPlugin, RocketSlateLinksButton };
