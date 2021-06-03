import React, { useCallback, useMemo, useState } from 'react';
//import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import {
  RocketSlate,
  defaultPlugins,
  convertState,
} from '..';

const fakeUser = [
  { id: 1, text: 'User 1', type: 'user' },
  { id: 2, text: 'User 2', type: 'user' },
  { id: 3, text: 'User 3', type: 'user' },
  { id: 4, text: 'User 4', type: 'user' },
  { id: 5, text: 'User 5', type: 'user' },
];

const fakeTasks = [
  { id: 1, text: 'Task 1', type: 'task' },
  { id: 2, text: 'Task 2', type: 'task' },
  { id: 3, text: 'Task 3', type: 'task' },
  { id: 4, text: 'Task 4', type: 'task' },
  { id: 5, text: 'Task 5', type: 'task' },
];

export default {
  title: 'RocketEditor',
  decorators: [withKnobs],
};


export const Example = () => {
  const [editorValue, setValue] = useState(initialState);

  return (
    <div>
      <RocketSlate
        initialValue={initialValuePlainText}
        onChange={(newValue) => {
          setValue(newValue);
          // save newValue...
        }}
      />

      <h4>Value:</h4>
      <code>
        {JSON.stringify(value)}
      </code>
    </div>
  );
};
