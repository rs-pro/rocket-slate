import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import {
  ToolbarButton,
  ToolbarBlock,
  ToolbarMark,
  ToolbarList,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  BLOCKQUOTE,
  HeadingType,
  ListType,
  ToolbarButtonProps,
} from 'slate-plugins-next';
import Tooltip from '@rocket-slate/core/Tooltip';

import IconBold from './icons/Bold';
import IconItalic from './icons/Italic';
import IconStrike from './icons/Strike';
import IconUnderline from './icons/Underline';
import IconUl from './icons/ListBulleted';
import IconOl from './icons/ListNumbered';
import IconH1 from './icons/H1';
import IconH2 from './icons/H2';
import IconH3 from './icons/H3';
import IconH4 from './icons/H4';
import IconH5 from './icons/H5';
import IconH6 from './icons/H6';
import { ToolbarFormatProps } from 'slate-plugins-next/dist/common/types';

export enum RocketToolbarButtons {
  BOLD = MARK_BOLD as any,
  ITALIC = MARK_ITALIC as any,
  STRIKETHROUGH = MARK_STRIKETHROUGH as any,
  UNDERLINE = MARK_UNDERLINE as any,
  BLOCKQUOTE = BLOCKQUOTE as any,
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
  [RocketToolbarButtons.UL]: { icon: IconUl, title: 'Не нумерованый список' },
  [RocketToolbarButtons.OL]: { icon: IconOl, title: 'Нумерованый список' },
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

const styledButton = css`
  display: inline-block;
  padding: 5px;
  border: 1px solid currentColor;
  border-radius: 2px;
  > svg {
    display: inline-block;
    fill: currentColor;
    vertical-align: middle;
  }
`;

const withRef = <T extends {}>(Component: React.ComponentType<T>) => {
  class WithRef extends React.PureComponent<
    T & {
      onRef: React.Ref<any>;
    },
    any
  > {
    public componentDidMount(): void {
      const { onRef } = this.props;
      const node = ReactDOM.findDOMNode(this);
      if (typeof onRef === 'function') {
        onRef(node);
      }
    }

    public render() {
      const { onRef, ...props } = this.props;
      return <Component {...(props as T)} />;
    }
  }

  return React.forwardRef<any, T>((props, ref) => <WithRef {...(props as T)} onRef={ref} />);
};

const RocketWysiwygToolbarButton: React.FC<ToolbarButtonProps> = styled(withRef<ToolbarButtonProps>(ToolbarButton))`
  ${styledButton}
`;

const RocketWysiwygToolbarButtonBlock: React.FC<ToolbarFormatProps> = styled(withRef<ToolbarFormatProps>(ToolbarBlock))`
  ${styledButton}
`;

const RocketWysiwygToolbarButtonMark: React.FC<ToolbarFormatProps> = styled(withRef<ToolbarFormatProps>(ToolbarMark))`
  ${styledButton}
`;

const RocketWysiwygToolbarButtonList: React.FC<ToolbarFormatProps> = styled(withRef<ToolbarFormatProps>(ToolbarList))`
  ${styledButton}
`;

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
        <Tooltip title={title || defaultTitle}>
          <RocketWysiwygToolbarButtonBlock format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </Tooltip>
      );
    }
    case RocketToolbarButtons.BOLD:
    case RocketToolbarButtons.ITALIC:
    case RocketToolbarButtons.UNDERLINE:
    case RocketToolbarButtons.STRIKETHROUGH: {
      return (
        <Tooltip title={title || defaultTitle}>
          <RocketWysiwygToolbarButtonMark format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </Tooltip>
      );
    }
    case RocketToolbarButtons.OL:
    case RocketToolbarButtons.UL: {
      return (
        <Tooltip title={title || defaultTitle}>
          <RocketWysiwygToolbarButtonList format={(format as unknown) as string} icon={<Icon />} {...restProps} />
        </Tooltip>
      );
    }
    default:
      return (
        <Tooltip title={title || ''}>
          <RocketWysiwygToolbarButton format={(format as unknown) as string} icon={icon} {...restProps} />
        </Tooltip>
      );
  }
};

export {
  RocketWysiwygButton,
  RocketWysiwygToolbarButton,
  RocketWysiwygToolbarButtonBlock,
  RocketWysiwygToolbarButtonMark,
  RocketWysiwygToolbarButtonList,
};
