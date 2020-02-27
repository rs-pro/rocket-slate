import React, { useCallback, useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

import { RocketSlate, RocketToolbar, RocketToolbarGroup, initialValue } from '@rocket-slate/core';
import { RocketToolbarButtons, RocketWysiwygButton, RocketWysiwygPlugin } from '@rocket-slate/wysiwyg';
import { RocketSlateChecklistPlugin, RocketSlateChecklistButton } from '@rocket-slate/checklist';
import { RocketSlateMentionPlugin, RocketSlateMentionSelect, IMention } from '@rocket-slate/mentions';
import { RocketSlateLinksPlugin, RocketSlateLinksButton } from '@rocket-slate/links';
import { RocketSlateImagePlugin, RocketSlateButtonImage } from '@rocket-slate/image';
import {
  RocketSlateCodeInlinePlugin,
  RocketSlateCodePlugin,
  RocketSlateCodeButton,
  RocketSlateCodeInlineButton,
  escapeHTML,
} from '@rocket-slate/code';

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

let timeOutId: number | undefined;

const languagesList = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'jsx', label: 'JSX' },
  { value: 'tsx', label: 'TSX' },
  { value: 'rb', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'sql', label: 'SQL' },
  { value: 'markup', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

storiesOf('Editor', module).add('default', () => {
  const plugins = useMemo(
    () => [
      RocketWysiwygPlugin(),
      RocketSlateChecklistPlugin(),
      RocketSlateMentionPlugin(),
      RocketSlateLinksPlugin(),
      RocketSlateImagePlugin({
        onInsertImage: (file, callback) => {
          const url = URL.createObjectURL(file);
          setTimeout(() => {
            callback(url);
          }, 1000);
        },
      }),
      RocketSlateCodeInlinePlugin(),
      RocketSlateCodePlugin({
        highlight: (code, lang) => {
          if (lang !== undefined && languages[lang] !== undefined) {
            return highlight(code, languages[lang], lang);
          }
          return escapeHTML(code);
        },
        languages: languagesList,
      }),
    ],
    [],
  );

  const [editorValue, setValue] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);
  const [mentions, setMention] = useState<IMention[]>([]);

  const handlerChangeSearchMention = useCallback((search, searchPrefix) => {
    setLoading(true);
    clearTimeout(timeOutId);
    if (search !== null && search !== undefined) {
      if (searchPrefix === '@') {
        timeOutId = setTimeout(() => {
          setMention(fakeUser);
          setLoading(false);
        }, 1000);
      }
      if (searchPrefix === '#') {
        timeOutId = setTimeout(() => {
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
        <RocketToolbarGroup>
          <RocketSlateCodeInlineButton />
          <RocketSlateCodeButton />
        </RocketToolbarGroup>
        <RocketToolbarGroup>
          <RocketSlateLinksButton />
          <RocketSlateButtonImage />
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
