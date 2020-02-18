import React, { useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useEditor, useSlate, ReactEditor } from 'slate-react';
import { PortalBody, onChangeMention, onKeyDownMention } from 'slate-plugins-next';
import { MENTION_ON_CHANGE, MENTION_ON_KEYDOWN } from './Plugin';

interface IMention {
  id: string | number;
  text: string;
  data: any;
}

const RocketSlateMentionListItem = styled.div<{ isActive: boolean }>`
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

const RocketSlateMentionList = ({
  target,
  index,
  mentions,
  renderMention,
}: {
  target: any;
  index: number;
  mentions: IMention[];
  renderMention?: (mention: IMention, isActive: boolean) => React.ReactElement;
}) => {
  const ref: any = useRef();
  const editor = useSlate();

  useEffect(() => {
    if (target && mentions.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [mentions.length, editor, target]);
  return (
    <PortalBody>
      <RocketSlateMentionListWrap ref={ref}>
        {renderMention
          ? mentions.map((mention, i) => (
              <React.Fragment key={mention.id}>{renderMention(mention, i === index)}</React.Fragment>
            ))
          : mentions.map((mention, i) => (
              <RocketSlateMentionListItem key={mention.id} isActive={i === index}>
                {mention.text}
              </RocketSlateMentionListItem>
            ))}
      </RocketSlateMentionListWrap>
    </PortalBody>
  );
};

const RocketSlateMentionSelect = (props: {
  mentions: IMention[];
  renderMention?: (mention: IMention, isActive: boolean) => React.ReactElement;
  onChangeSearch?: (search: string) => void;
}) => {
  const { mentions = [], onChangeSearch } = props;

  const editor = useEditor();
  const [target, setTarget] = useState();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (target) {
      if (onChangeSearch) {
        onChangeSearch(search);
      }
    }
  }, [target, search]);

  const handlerChangeValueEditor = useCallback(() => {
    onChangeMention({
      editor,
      setTarget,
      setSearch,
      setIndex,
    });
  }, [mentions, target, index, search]);

  const handlerKeyDown = useCallback(
    onKeyDownMention({
      chars: mentions,
      target,
      setTarget,
      index,
      setIndex,
    }),
    [mentions, target, index],
  );

  MENTION_ON_CHANGE.set(editor, handlerChangeValueEditor);
  MENTION_ON_KEYDOWN.set(editor, handlerKeyDown);

  return (
    <>{target && mentions.length > 0 && <RocketSlateMentionList target={target} index={index} mentions={mentions} />}</>
  );
};

export {
  RocketSlateMentionSelect,
  RocketSlateMentionListItem,
  RocketSlateMentionListWrap,
  RocketSlateMentionList,
  IMention,
};
