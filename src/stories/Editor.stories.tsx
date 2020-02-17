import React, { useMemo } from 'react';
import { storiesOf } from '@storybook/react';

import { RocketSlate, RocketToolbar, RocketToolbarGroup } from '@rocket-slate/core';
import {
  RocketToolbarButtons,
  RocketWysiwygButton,
  RocketWysiwygPlugin,
} from '@rocket-slate/wysiwyg';

storiesOf('Editor', module).add('default', () => {
  const plugins = useMemo(() => [RocketWysiwygPlugin()], []);
  return (
    <RocketSlate plugins={plugins}>
      <RocketToolbar>
        <RocketToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.H1} />
          <RocketWysiwygButton format={RocketToolbarButtons.H2} />
          <RocketWysiwygButton format={RocketToolbarButtons.H3} />
        </RocketToolbarGroup>
        <RocketToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.BOLD} />
          <RocketWysiwygButton format={RocketToolbarButtons.ITALIC} />
          <RocketWysiwygButton format={RocketToolbarButtons.UNDERLINE} />
          <RocketWysiwygButton format={RocketToolbarButtons.STRIKETHROUGH} />
        </RocketToolbarGroup>
        <RocketToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.UL} />
          <RocketWysiwygButton format={RocketToolbarButtons.OL} />
        </RocketToolbarGroup>
      </RocketToolbar>
    </RocketSlate>
  );
});
