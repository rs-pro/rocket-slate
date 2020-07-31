import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { Editor, Point, Location, Range, Transforms } from 'slate';
import styled from 'styled-components';
import { useEditor, useSlate, ReactEditor } from 'slate-react';
import { PortalBody } from 'slate-plugins-next';
import { MENTION_ON_CHANGE, MENTION_ON_KEYDOWN } from './events';

interface IMention {
  [kye: string]: any;
  id: string | number;
  text: string;
  type: string;
}

const RocketSlateMentionListItem = styled.div<{ isActive?: boolean; isLoading?: boolean; isEmpty?: boolean }>`
  padding: 1px 3px;
  border-radius: 3px;
  background: ${props => (props.isActive ? '#B4D5FF' : 'transparent')};
  cursor: pointer;
`;

const RocketSlateMentionListWrap = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
  z-index: 1;
  padding: 3px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
`;

interface IRenderMentionList {
  mentions: IMention[];
  renderMention?: (
    mention: IMention,
    isActive: boolean,
    onHover: (index) => void,
    onSelect: (index) => void,
  ) => React.ReactElement;
  isLoading?: boolean;
}

type RocketMentionList = {
  target: any;
  index: number;
  onHover: (index) => void;
  onSelect: (index) => void;
} & IRenderMentionList;

const RocketSlateMentionList = ({
  target,
  index,
  mentions,
  renderMention,
  isLoading,
  onHover,
  onSelect,
}: RocketMentionList) => {
  const ref: any = useRef();
  const editor = useSlate();

  useEffect(() => {
    if (target) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [mentions, editor, target, isLoading]);

  return (
    <PortalBody>
      <RocketSlateMentionListWrap ref={ref}>
        {isLoading ? (
          <RocketSlateMentionListItem isLoading>Загрузка...</RocketSlateMentionListItem>
        ) : (
          <>
            {mentions.length === 0 && (
              <RocketSlateMentionListItem isLoading>Ничего не найдено</RocketSlateMentionListItem>
            )}
            {mentions.length > 0 && (
              <>
                {renderMention
                  ? mentions.map((mention, i) => (
                      <React.Fragment key={mention.id}>
                        {renderMention(
                          mention,
                          i === index,
                          () => {
                            onHover(i);
                          },
                          () => {
                            onSelect(i);
                          },
                        )}
                      </React.Fragment>
                    ))
                  : mentions.map((mention, i) => (
                      <RocketSlateMentionListItem
                        key={mention.id}
                        isActive={i === index}
                        onMouseOver={() => {
                          onHover(i);
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          onSelect(i);
                        }}
                      >
                        {mention.text}
                      </RocketSlateMentionListItem>
                    ))}
              </>
            )}
          </>
        )}
      </RocketSlateMentionListWrap>
    </PortalBody>
  );
};

const AFTER_MATCH_REGEX = /^(\s|$)/;

const getText = (editor: Editor, at?: Location) => (at && Editor.string(editor, at)) || '';

const isPointAtWordEnd = (editor: Editor, { at }: { at: Point }) => {
  // Point after at
  const after = Editor.after(editor, at);

  // From at to after
  const afterRange = Editor.range(editor, at, after);
  const afterText = getText(editor, afterRange);

  // Match regex on after text
  return !!afterText.match(AFTER_MATCH_REGEX);
};

const isBeforeMatch = (editor: Editor, at: Point, beforeRegex: RegExp) => {
  // line before at
  const beforeLine = Editor.before(editor, at, { unit: 'line' });

  // Range from before to start
  const beforeLineRange = beforeLine && Editor.range(editor, beforeLine, at);

  // Before text
  const beforeText = getText(editor, beforeLineRange);

  // Match regex on before text
  const match = !!beforeText && beforeText.match(beforeRegex);

  let range: any = null;
  if (beforeLineRange && match) {
    const before = Editor.before(editor, at, { distance: (match.input || '').length - (match.index || 0) });
    range = before && Editor.range(editor, before, at);
  }

  return {
    range,
    match,
  };
};

const onChangeRocketMention = ({
  editor,
  callback,
  beforeRegex,
}: {
  editor: Editor;
  beforeRegex: RegExp;
  callback: (targetRange, match) => void;
}) => {
  const { selection } = editor;

  if (selection && Range.isCollapsed(selection)) {
    const at = Range.start(selection);
    const { range, match } = isBeforeMatch(editor, at, beforeRegex);
    if (match && isPointAtWordEnd(editor, { at })) {
      callback(range, match);
      return;
    }
  }

  callback(null, null);
};

const insertMention = (editor, mention: IMention) => {
  const { text, ...mentionData } = mention;
  const mentionNode = {
    type: 'mention',
    data: {
      ...mentionData,
    },
    children: [{ text }],
  };
  Transforms.insertNodes(editor, mentionNode);
  Transforms.move(editor);
};

const onKeyDownMention = (options: {
  mentions: IMention[];
  index: number;
  target: any;
  setIndex: any;
  setTarget: any;
}) => (e, editor) => {
  const { mentions, index, target, setIndex, setTarget } = options;

  if (target) {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const prevIndex = index >= mentions.length - 1 ? 0 : index + 1;
        setIndex(prevIndex);
        break;
      }

      case 'ArrowUp': {
        e.preventDefault();
        const nextIndex = index <= 0 ? mentions.length - 1 : index - 1;
        setIndex(nextIndex);
        break;
      }

      case 'Tab':
      case 'Enter':
        e.preventDefault();
        Transforms.select(editor, target);
        insertMention(editor, mentions[index]);
        setTarget(null);
        break;

      case 'Escape':
        e.preventDefault();
        setTarget(null);
        break;
      default:
        break;
    }
  }
};

type RocketMentionSelect = {
  prefix?: string[];
  onChangeSearch?: (search: string, searchPrefix: string) => void;
} & IRenderMentionList;

const RocketSlateMentionSelect = (props: RocketMentionSelect) => {
  const { mentions = [], prefix = ['@'], onChangeSearch, renderMention, isLoading } = props;

  const editor = useEditor();
  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const [searchPrefix, setSearchPrefix] = useState<string>();

  const beforeRegex = useMemo(() => new RegExp(`(^|\\s)([${[prefix.join('|')]}])([\\wА-Яа-я]+$|$)`), prefix);

  useEffect(() => {
    if (target) {
      if (onChangeSearch && searchPrefix) {
        onChangeSearch(search, searchPrefix);
      }
    }
  }, [target, search, searchPrefix]);

  const handlerChangeValueEditor = useCallback(() => {
    onChangeRocketMention({
      editor,
      beforeRegex,
      callback: (targetRange, match) => {
        setIndex(0);
        setTarget(targetRange);
        if (match) {
          setSearch(match[3]);
          setSearchPrefix(match[2]);
        }
      },
    });
  }, [mentions, target, index, search, searchPrefix]);

  const handlerKeyDown = useCallback(
    onKeyDownMention({
      mentions,
      target,
      index,
      setTarget,
      setIndex,
    }),
    [mentions, target, index],
  );

  MENTION_ON_CHANGE.set(editor, handlerChangeValueEditor);
  MENTION_ON_KEYDOWN.set(editor, handlerKeyDown);

  const handleHover = useCallback(
    // eslint-disable-next-line no-shadow
    index => {
      setIndex(index);
    },
    [mentions, target, index, setIndex],
  );

  const handleSelect = useCallback(
    // eslint-disable-next-line no-shadow
    index => {
      if (target) {
        Transforms.select(editor, target as any);
        insertMention(editor, mentions[index]);
        setTarget(null as any);
      }
    },
    [mentions, target, index, setTarget],
  );

  if (target) {
    return (
      <RocketSlateMentionList
        target={target}
        index={index}
        mentions={mentions}
        renderMention={renderMention}
        isLoading={isLoading}
        onHover={handleHover}
        onSelect={handleSelect}
      />
    );
  }

  return null;
};

export {
  RocketSlateMentionSelect,
  RocketSlateMentionListItem,
  RocketSlateMentionListWrap,
  RocketSlateMentionList,
  IMention,
};
