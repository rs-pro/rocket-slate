import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { renderMention } from "./renderMention"
import { Editor } from "rocket-slate/src/Editor.tsx"

storiesOf('Input', module)
  .add('default', () => <Editor />);
