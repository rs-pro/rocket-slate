import React, { ReactNode } from 'react';

import {
  ToolbarList,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  BLOCKQUOTE as BQ,
  HeadingType,
  ListType,
} from 'slate-plugins-next';
import {
  RocketTooltip,
  RocketButton,
  withBaseStyleButton,
  withButtonRef,
  RocketButtonBlock,
  RocketButtonMark,
} from '@rocket-slate/editor';

import { ToolbarFormatProps } from 'slate-plugins-next/dist/common/types';
import {
  IconBold,
  IconItalic,
  IconStrike,
  IconUnderline,
  IconListBulleted,
  IconListNumbered,
  IconQuote,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
} from '@rocket-slate/icons';

export enum RocketToolbarButtons {
  BOLD = MARK_BOLD as any,
  ITALIC = MARK_ITALIC as any,
  STRIKETHROUGH = MARK_STRIKETHROUGH as any,
  UNDERLINE = MARK_UNDERLINE as any,
  BLOCKQUOTE = BQ as any,
  H1 = HeadingType.H1 as any,
  H2 = HeadingType.H2 as any,
  H3 = HeadingType.H3 as any,
  H4 = HeadingType.H4 as any,
  H5 = HeadingType.H5 as any,
  H6 = HeadingType.H5 as any,
  UL = ListType.UL_LIST as any,
  OL = ListType.OL_LIST as any,
}

const RocketButtonIcons = {
  [RocketToolbarButtons.BOLD]: { icon: IconBold, title: 'Полужирный' },
  [RocketToolbarButtons.ITALIC]: { icon: IconItalic, title: 'Курсив' },
  [RocketToolbarButtons.STRIKETHROUGH]: { icon: IconStrike, title: 'Перечеркнутый' },
  [RocketToolbarButtons.UNDERLINE]: { icon: IconUnderline, title: 'Подчеркнутый' },
  [RocketToolbarButtons.BLOCKQUOTE]: { icon: IconQuote, title: 'Цитата' },
  [RocketToolbarButtons.UL]: { icon: IconListBulleted, title: 'Не нумерованый список' },
  [RocketToolbarButtons.OL]: { icon: IconListNumbered, title: 'Нумерованый список' },
  [RocketToolbarButtons.H1]: { icon: IconH1, title: 'Заголовок 1' },
  [RocketToolbarButtons.H2]: { icon: IconH2, title: 'Заголовок 2' },
  [RocketToolbarButtons.H3]: { icon: IconH3, title: 'Заголовок 3' },
  [RocketToolbarButtons.H4]: { icon: IconH4, title: 'Заголовок 4' },
  [RocketToolbarButtons.H5]: { icon: IconH5, title: 'Заголовок 5' },
  [RocketToolbarButtons.H6]: { icon: IconH6, title: 'Заголовок 6' },
};

interface IRocketToolbarButtonProps {
  format: RocketToolbarButtons | string;
  icon?: ReactNode;
  title?: string;
}

const RocketWysiwygButtonList: React.FC<ToolbarFormatProps> = withButtonRef(
  withBaseStyleButton<ToolbarFormatProps>(ToolbarList),
);

const RocketWysiwygButton: React.FunctionComponent<IRocketToolbarButtonProps> = (props) => {
  const { format, icon, title, ...restProps } = props;
  const { icon: Icon, title: defaultTitle } = RocketButtonIcons[format];
  switch (format) {
    case RocketToolbarButtons.H1:
    case RocketToolbarButtons.H2:
    case RocketToolbarButtons.H3:
    case RocketToolbarButtons.H4:
    case RocketToolbarButtons.H5:
    case RocketToolbarButtons.H6:
    case RocketToolbarButtons.BLOCKQUOTE: {
      return (
        <RocketTooltip title={title || defaultTitle}>
          <RocketButtonBlock format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </RocketTooltip>
      );
    }
    case RocketToolbarButtons.BOLD:
    case RocketToolbarButtons.ITALIC:
    case RocketToolbarButtons.UNDERLINE:
    case RocketToolbarButtons.STRIKETHROUGH: {
      return (
        <RocketTooltip title={title || defaultTitle}>
          <RocketButtonMark format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </RocketTooltip>
      );
    }
    case RocketToolbarButtons.OL:
    case RocketToolbarButtons.UL: {
      return (
        <RocketTooltip title={title || defaultTitle}>
          <RocketWysiwygButtonList format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </RocketTooltip>
      );
    }
    default:
      return (
        <RocketTooltip title={title || ''}>
          <RocketButton format={(format as unknown) as string} icon={icon} {...restProps} />
        </RocketTooltip>
      );
  }
};

export { RocketWysiwygButton };
