import Tippy, { TippyProps } from '@tippy.js/react';
import React from 'react';

interface ITooltipProps extends Pick<TippyProps, 'children'> {
  title: string;
}

export default class Tooltip extends React.PureComponent<ITooltipProps, any> {
  public render() {
    const { title, children } = this.props;
    return <Tippy content={title}>{children}</Tippy>;
  }
}
