// import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { RocketSlate } from '@rocket-slate/core';
import { RocketWysiwygPlugin, RocketToolbar, RocketToolbarButton } from '@rocket-slate/wysiwyg';

storiesOf('Editor', module).add('default', () => {
  return (
    <RocketSlate plugins={[RocketWysiwygPlugin()]}>
      <RocketToolbar>
        <RocketToolbarButton />
      </RocketToolbar>
    </RocketSlate>
  );
});
