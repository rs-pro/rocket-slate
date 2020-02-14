import React, { useMemo } from 'react';
import { storiesOf } from '@storybook/react';

import { RocketSlate } from '@rocket-slate/core';
import {
  RocketToolbarButtons,
  RocketWysiwygButton,
  RocketWysiwygPlugin,
  RocketWysiwygToolbar,
  RocketWysiwygToolbarGroup,
} from '@rocket-slate/wysiwyg';

storiesOf('Editor', module).add('default', () => {
  const plugins = useMemo(() => [RocketWysiwygPlugin()], []);
  return (
    <RocketSlate plugins={plugins}>
      <RocketWysiwygToolbar>
        <RocketWysiwygToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.H1} />
          <RocketWysiwygButton format={RocketToolbarButtons.H2} />
          <RocketWysiwygButton format={RocketToolbarButtons.H3} />
        </RocketWysiwygToolbarGroup>
        <RocketWysiwygToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.BOLD} />
          <RocketWysiwygButton format={RocketToolbarButtons.ITALIC} />
          <RocketWysiwygButton format={RocketToolbarButtons.UNDERLINE} />
          <RocketWysiwygButton format={RocketToolbarButtons.STRIKETHROUGH} />
        </RocketWysiwygToolbarGroup>
        <RocketWysiwygToolbarGroup>
          <RocketWysiwygButton format={RocketToolbarButtons.UL} />
          <RocketWysiwygButton format={RocketToolbarButtons.OL} />
        </RocketWysiwygToolbarGroup>
      </RocketWysiwygToolbar>
    </RocketSlate>
  );
});
