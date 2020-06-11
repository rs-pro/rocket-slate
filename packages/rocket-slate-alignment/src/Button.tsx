import React from 'react';
import { Editor, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import { isBlockActive } from 'slate-plugins-next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { RocketTooltip, RocketButton } from '@rocket-slate/editor';
import { ALIGNMENT } from './Plugin';

type AlignType = 'justify' | 'left' | 'center' | 'right';

const getIcon = (type: AlignType) => {
  if (type === 'center') return <FontAwesomeIcon icon={faAlignCenter} />;
  if (type === 'right') return <FontAwesomeIcon icon={faAlignRight} />;
  if (type === 'left') return <FontAwesomeIcon icon={faAlignLeft} />;
  if (type === 'justify') return <FontAwesomeIcon icon={faAlignJustify} />;
  return null;
};

const isAlignActive = (editor, align: AlignType) => {
  const [match] = Editor.nodes(editor, {
    match: node => {
      return node.type === ALIGNMENT && node.data.align === align;
    },
    mode: 'all',
  });
  return !!match;
};

const unwrapAlignment = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: node => node.type === ALIGNMENT,
  });
};

const toggleAlign = (editor: Editor, align: AlignType) => {
  if (isAlignActive(editor, align)) {
    unwrapAlignment(editor);
  } else {
    if (isBlockActive(editor, ALIGNMENT)) {
      unwrapAlignment(editor);
    }
    Transforms.wrapNodes(editor, {
      type: ALIGNMENT,
      data: { align },
      children: [],
    });
  }
};

export const RocketSlateAlignmentButton: React.FC<{
  className?: string;
  icon?: React.ReactNode;
  type: 'justify' | 'left' | 'center' | 'right';
}> = ({ className, icon, type }) => {
  const editor = useSlate();
  const handlerMouseDownLinkButton = () => toggleAlign(editor, type);
  return (
    <RocketTooltip title={editor.getLocale(`alignment.btns.${type}`)}>
      <RocketButton
        className={className}
        icon={icon || getIcon(type)}
        active={isAlignActive(editor, type)}
        onMouseDown={handlerMouseDownLinkButton}
      />
    </RocketTooltip>
  );
};
