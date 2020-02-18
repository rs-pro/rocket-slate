import React, { useCallback, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';

import { RocketSlate, RocketToolbar, RocketToolbarGroup } from '@rocket-slate/core';
import { RocketToolbarButtons, RocketWysiwygButton, RocketWysiwygPlugin } from '@rocket-slate/wysiwyg';
import { RocketSlateChecklistPlugin, RocketSlateChecklistButton } from '@rocket-slate/checklist';
import { RocketSlateMentionPlugin, RocketSlateMentionSelect, IMention } from '@rocket-slate/mentions';

const fakeMention: IMention[] = [
  { id: 1, data: {}, text: 'User 1' },
  { id: 2, data: {}, text: 'User 2' },
  { id: 3, data: {}, text: 'User 3' },
  { id: 4, data: {}, text: 'User 4' },
  { id: 5, data: {}, text: 'User 5' },
];

storiesOf('Editor', module).add('default', () => {
  const plugins = useMemo(() => [RocketWysiwygPlugin(), RocketSlateChecklistPlugin(), RocketSlateMentionPlugin()], []);
  // tslint:disable-next-line:no-console
  const handlerChangeValue = useCallback((value) => console.log(value), []);
  const [mentions, setMention] = useState<IMention[]>([]);
  const handlerChangeSearchMention = useCallback((search) => {
    console.log('handlerChangeSearchMention');
    setTimeout(() => {
      setMention(fakeMention);
    }, 1000);
  }, []);
  return (
    <RocketSlate plugins={plugins} onChange={handlerChangeValue}>
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
      <RocketSlateMentionSelect mentions={mentions} onChangeSearch={handlerChangeSearchMention} />
    </RocketSlate>
  );
});
