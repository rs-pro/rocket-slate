import Tippy, { TippyProps } from '@tippy.js/react';
import React from 'react';

export interface ITooltipProps extends Pick<TippyProps, 'children'> {
  title: string;
}

export class RocketTooltip extends React.PureComponent<ITooltipProps, any> {
  public render() {
    const { title, children } = this.props;
    return <Tippy content={title}>{children}</Tippy>;
  }
}
