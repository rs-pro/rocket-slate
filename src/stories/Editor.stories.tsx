// import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Editor } from '@rocket-slate/core';

storiesOf('Editor', module).add('default', () => <Editor />);
