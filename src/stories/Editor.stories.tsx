// import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Editor } from '@rocket-slate/core';
import RenderMention from '~/components/RenderMention';

storiesOf('Editor', module).add('default', () => {
  return <Editor renderMention={RenderMention} />;
});
