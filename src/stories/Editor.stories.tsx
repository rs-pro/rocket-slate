import React, { useCallback, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { RocketSlate, RocketToolbar, RocketToolbarGroup } from '@rocket-slate/core';
import initialValue from '@rocket-slate/core/initialValue';

import { RocketToolbarButtons, RocketWysiwygButton, RocketWysiwygPlugin } from '@rocket-slate/wysiwyg';
import { RocketSlateChecklistPlugin, RocketSlateChecklistButton } from '@rocket-slate/checklist';
import { RocketSlateMentionPlugin, RocketSlateMentionSelect, IMention } from '@rocket-slate/mentions';

const fakeUser: IMention[] = [
  { id: 1, data: {}, text: 'User 1' },
  { id: 2, data: {}, text: 'User 2' },
  { id: 3, data: {}, text: 'User 3' },
  { id: 4, data: {}, text: 'User 4' },
  { id: 5, data: {}, text: 'User 5' },
];

const fakeTasks: IMention[] = [
  { id: 1, data: {}, text: 'Task 1' },
  { id: 2, data: {}, text: 'Task 2' },
  { id: 3, data: {}, text: 'Task 3' },
  { id: 4, data: {}, text: 'Task 4' },
  { id: 5, data: {}, text: 'Task 5' },
];

let timeoutUser: number | undefined;
let timeoutTask: number | undefined;

storiesOf('Editor', module).add('default', () => {
  const plugins = useMemo(() => [RocketWysiwygPlugin(), RocketSlateChecklistPlugin(), RocketSlateMentionPlugin()], []);

  const [editorValue, setValue] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);
  const [mentions, setMention] = useState<IMention[]>([]);

  const handlerChangeSearchMention = useCallback((search, searchPrefix) => {
    setLoading(true);
    if (search !== null && search !== undefined) {
      if (searchPrefix === '@') {
        clearTimeout(timeoutUser);
        timeoutUser = setTimeout(() => {
          setMention(fakeUser);
          setLoading(false);
        }, 1000);
      }
      if (searchPrefix === '#') {
        clearTimeout(timeoutTask);
        timeoutTask = setTimeout(() => {
          setMention(fakeTasks);
          setLoading(false);
        }, 1000);
      }
    } else {
      setMention([]);
      setLoading(false);
    }
  }, []);

  const handlerChangeValue = useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <RocketSlate plugins={plugins} value={editorValue} onChange={handlerChangeValue}>
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
          <RocketSlateChecklistButton />
        </RocketToolbarGroup>
      </RocketToolbar>
      <RocketSlateMentionSelect
        mentions={mentions}
        prefix={['@', '#']}
        onChangeSearch={handlerChangeSearchMention}
        isLoading={isLoading}
      />
    </RocketSlate>
  );
});
