// import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { RocketSlate } from '@rocket-slate/core';
import { RocketWysiwygPlugin } from '@rocket-slate/wysiwyg';
import IconBold from '@rocket-slate/wysiwyg/icons/Bold';
import IconItalic from '@rocket-slate/wysiwyg/icons/Italic';

// TODO: пока для теста, будет перенесено в wysiwyg
import {
  HeadingToolbar,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
} from 'slate-plugins-next';

storiesOf('Editor', module).add('default', () => {
  return (
    <RocketSlate plugins={[RocketWysiwygPlugin()]}>
      <HeadingToolbar>
        <ToolbarMark format={MARK_BOLD} icon={<IconBold />} />
        <ToolbarMark format={MARK_ITALIC} icon={<IconItalic />} />
      </HeadingToolbar>
    </RocketSlate>
  );
});
