import React, { ReactNode } from 'react';
import { useSlate } from 'slate-react';
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
  [RocketToolbarButtons.BOLD]: { icon: IconBold, locale: 'wysiwyg.btns.bold' },
  [RocketToolbarButtons.ITALIC]: { icon: IconItalic, locale: 'wysiwyg.btns.italic' },
  [RocketToolbarButtons.STRIKETHROUGH]: { icon: IconStrike, locale: 'wysiwyg.btns.strikethrough' },
  [RocketToolbarButtons.UNDERLINE]: { icon: IconUnderline, locale: 'wysiwyg.btns.underline' },
  [RocketToolbarButtons.BLOCKQUOTE]: { icon: IconQuote, locale: 'wysiwyg.btns.blockquote' },
  [RocketToolbarButtons.UL]: { icon: IconListBulleted, locale: 'wysiwyg.btns.ul' },
  [RocketToolbarButtons.OL]: { icon: IconListNumbered, locale: 'wysiwyg.btns.ol' },
  [RocketToolbarButtons.H1]: { icon: IconH1, locale: 'wysiwyg.btns.h1' },
  [RocketToolbarButtons.H2]: { icon: IconH2, locale: 'wysiwyg.btns.h2' },
  [RocketToolbarButtons.H3]: { icon: IconH3, locale: 'wysiwyg.btns.h3' },
  [RocketToolbarButtons.H4]: { icon: IconH4, locale: 'wysiwyg.btns.h4' },
  [RocketToolbarButtons.H5]: { icon: IconH5, locale: 'wysiwyg.btns.h5' },
  [RocketToolbarButtons.H6]: { icon: IconH6, locale: 'wysiwyg.btns.h6' },
};

interface IRocketToolbarButtonProps {
  className?: string;
  format: RocketToolbarButtons | string;
  icon?: ReactNode;
}

const RocketWysiwygButtonList: React.FC<ToolbarFormatProps> = withButtonRef(
  withBaseStyleButton<ToolbarFormatProps>(ToolbarList),
);

const RocketWysiwygButton: React.FunctionComponent<IRocketToolbarButtonProps> = props => {
  const editor = useSlate();
  const { format, icon, ...restProps } = props;
  const { icon: Icon, locale } = RocketButtonIcons[format];
  const title = editor.getLocale(locale);

  const btnIcon = icon || <Icon />;

  switch (format) {
    case RocketToolbarButtons.H1:
    case RocketToolbarButtons.H2:
    case RocketToolbarButtons.H3:
    case RocketToolbarButtons.H4:
    case RocketToolbarButtons.H5:
    case RocketToolbarButtons.H6:
    case RocketToolbarButtons.BLOCKQUOTE: {
      return (
        <RocketTooltip title={title}>
          <RocketButtonBlock format={(format as unknown) as string} icon={btnIcon} {...restProps} />
        </RocketTooltip>
      );
    }
    case RocketToolbarButtons.BOLD:
    case RocketToolbarButtons.ITALIC:
    case RocketToolbarButtons.UNDERLINE:
    case RocketToolbarButtons.STRIKETHROUGH: {
      return (
        <RocketTooltip title={title}>
          <RocketButtonMark format={(format as unknown) as string} icon={btnIcon} {...restProps} />
        </RocketTooltip>
      );
    }
    case RocketToolbarButtons.OL:
    case RocketToolbarButtons.UL: {
      return (
        <RocketTooltip title={title}>
          <RocketWysiwygButtonList format={(format as unknown) as string} icon={btnIcon} {...restProps} />
        </RocketTooltip>
      );
    }
    default:
      return (
        <RocketTooltip title={title}>
          <RocketButton format={(format as unknown) as string} icon={btnIcon} {...restProps} />
        </RocketTooltip>
      );
  }
};

export { RocketWysiwygButton };
