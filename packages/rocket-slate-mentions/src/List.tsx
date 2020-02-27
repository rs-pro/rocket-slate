import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { Editor, Range } from 'slate';
import styled from 'styled-components';
import { useEditor, useSlate, ReactEditor } from 'slate-react';
import { PortalBody, onChangeMention, onKeyDownMention } from 'slate-plugins-next';
import { MENTION_ON_CHANGE, MENTION_ON_KEYDOWN } from './Plugin';

interface IMention {
  id: string | number;
  text: string;
  data: any;
}

const RocketSlateMentionListItem = styled.div<{ isActive?: boolean; isLoading?: boolean; isEmpty?: boolean }>`
  padding: 1px 3px;
  border-radius: 3px;
  background: ${(props) => (props.isActive ? '#B4D5FF' : 'transparent')};
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
  renderMention?: (mention: IMention, isActive: boolean) => React.ReactElement;
  isLoading?: boolean;
}

type RocketMentionList = {
  target: any;
  index: number;
} & IRenderMentionList;

const RocketSlateMentionList = ({ target, index, mentions, renderMention, isLoading }: RocketMentionList) => {
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
          <RocketSlateMentionListItem isLoading={true}>Загрузка...</RocketSlateMentionListItem>
        ) : (
          <>
            {mentions.length === 0 && (
              <RocketSlateMentionListItem isLoading={true}>Ничего не найдено</RocketSlateMentionListItem>
            )}
            {mentions.length > 0 && (
              <>
                {renderMention
                  ? mentions.map((mention, i) => (
                      <React.Fragment key={mention.id}>{renderMention(mention, i === index)}</React.Fragment>
                    ))
                  : mentions.map((mention, i) => (
                      <RocketSlateMentionListItem key={mention.id} isActive={i === index}>
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

const beforeRegexSpace = /^(\s|$)/;
const afterRegexSpace = /^(\s|$)/;

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
    const [start] = Range.edges(selection);
    const beforeLine = Editor.before(editor, start, {
      unit: 'line',
    });

    if (beforeLine) {
      const beforeLineRange = beforeLine && Editor.range(editor, beforeLine, start);
      const beforeLineText = beforeLineRange && Editor.string(editor, beforeLineRange);
      const beforeLineMatch = beforeLineText && beforeLineText.match(beforeRegex);

      if (beforeLineMatch) {
        // изменяем указатель на позицию найденную регуляркой
        beforeLine.offset = beforeLineMatch.index || 0;

        // Проверяем что перед найденным совпадением есть пробел или пустая строка
        const before = Editor.before(editor, beforeLine);
        const beforeRange = Editor.range(editor, beforeLine, before);
        const beforeText = Editor.string(editor, beforeRange);
        const beforeMatch = beforeText.match(beforeRegexSpace);

        // Проверяем что после найденнлшл совпадения есть пробел или пустая строка
        const after = Editor.after(editor, start);
        const afterRange = Editor.range(editor, start, after);
        const afterText = Editor.string(editor, afterRange);
        const afterMatch = afterText.match(afterRegexSpace);

        if (beforeMatch && afterMatch) {
          const targetRange = Editor.range(editor, beforeLine, start);
          callback(targetRange, beforeLineMatch);
          return;
        }
      }
    }
  }

  callback(null, null);
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
  const [searchPrefix, setSearchPrefix] = useState();

  const beforeRegex = useMemo(() => new RegExp(`([${[prefix.join('|')]}])(\\w+$|$)`), prefix);

  useEffect(() => {
    if (target) {
      if (onChangeSearch) {
        onChangeSearch(search, searchPrefix);
      }
    }
  }, [target, search, searchPrefix]);

  const handlerChangeValueEditor = useCallback(() => {
    onChangeRocketMention({
      editor,
      beforeRegex,
      callback: (target1, match) => {
        setIndex(0);
        setTarget(target1);
        if (match) {
          setSearch(match[2]);
          setSearchPrefix(match[1]);
        }
      },
    });
  }, [mentions, target, index, search, searchPrefix]);

  const handlerKeyDown = useCallback(
    onKeyDownMention({
      chars: mentions,
      target,
      index,
      setTarget,
      setIndex,
    }),
    [mentions, target, index],
  );

  MENTION_ON_CHANGE.set(editor, handlerChangeValueEditor);
  MENTION_ON_KEYDOWN.set(editor, handlerKeyDown);

  if (target) {
    return (
      <RocketSlateMentionList
        target={target}
        index={index}
        mentions={mentions}
        renderMention={renderMention}
        isLoading={isLoading}
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
