import React, { PureComponent, ReactNode } from 'react';
import IconBold from './icons/Bold';
import IconItalic from './icons/Italic';

import {
  ToolbarBlock,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  BLOCKQUOTE,
  HeadingType,
  ListType,
} from 'slate-plugins-next';

export const RocketToolbarButtons = {
  BOLD: MARK_BOLD,
  ITALIC: MARK_ITALIC,
  STRIKETHROUGH: MARK_STRIKETHROUGH,
  UNDERLINE: MARK_UNDERLINE,
  BLOCKQUOTE,
  H1: HeadingType.H1,
  H2: HeadingType.H2,
  H3: HeadingType.H3,
  H4: HeadingType.H4,
  H5: HeadingType.H5,
  H6: HeadingType.H5,
  UL: ListType.UL_LIST,
  OL: ListType.OL_LIST,
};

interface IRocketToolbarButtonProps {
  format?: string;
  icon?: ReactNode;
}

class RocketToolbarButton extends PureComponent<IRocketToolbarButtonProps> {
  public render() {
    return <ToolbarMark />;
  }
}

export { RocketToolbarButton };
