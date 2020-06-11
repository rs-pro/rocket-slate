import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useSlate } from 'slate-react';
import styled, { css } from 'styled-components';
import {
  ToolbarButton,
  ToolbarMark,
  ToolbarBlock,
  ToolbarButtonProps,
  isBlockActive,
  isMarkActive,
} from 'slate-plugins-next';
import { ToolbarFormatProps } from 'slate-plugins-next/dist/common/types';
import { RocketTooltip } from './Tooltip';

export { isBlockActive, isMarkActive };

const baseStyleButton = css`
  display: inline-block;
  padding: 5px;
  min-width: 30px;
  max-height: 30px;
  text-align: center;
  border: 1px solid currentColor;
  border-radius: 2px;
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1;
  > svg {
    display: inline-block;
    fill: currentColor;
    vertical-align: middle;
  }
`;

export function withButtonRef<T = any>(Component: React.FunctionComponent<T>) {
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
}

export function withBaseStyleButton<T = any>(
  Component: React.FunctionComponent<T> | 'a' | 'button' | 'div' | 'label' | 'span',
) {
  return styled(Component)`
    ${baseStyleButton}
  `;
}

export const withActiveClass = WrappedComponent => {
  return React.forwardRef(function withActiveClassHOC(props: any, ref) {
    const { className, active } = props;
    return <WrappedComponent {...props} ref={ref} className={classNames(className, { 'is-active': active })} />;
  });
};

export const withActiveBlock = WrappedComponent => {
  return React.forwardRef(function withActiveBlockHOC(props: any, ref) {
    const { format } = props;
    const editor = useSlate();
    return <WrappedComponent {...props} ref={ref} active={isBlockActive(editor, format)} />;
  });
};

export const withActiveMark = WrappedComponent => {
  return React.forwardRef(function withActiveMarkHOC(props: any, ref) {
    const { format } = props;
    const editor = useSlate();
    return <WrappedComponent {...props} ref={ref} active={isMarkActive(editor, format)} />;
  });
};

export const withButtonTooltip = WrappedComponent => {
  return function withButtonTooltipHOC(props) {
    const { title, titleHotkey, ...restProps } = props;
    return (
      <RocketTooltip title={title + (titleHotkey ? ` (${titleHotkey})` : '')}>
        <WrappedComponent {...restProps} />
      </RocketTooltip>
    );
  };
};

export const RocketButton: React.FC<ToolbarButtonProps> = withButtonTooltip(
  withActiveClass(withButtonRef(withBaseStyleButton(ToolbarButton))),
);

export const RocketButtonBlock: React.FC<ToolbarFormatProps> = withButtonTooltip(
  withActiveBlock(withActiveClass(withButtonRef(withBaseStyleButton(ToolbarBlock)))),
);

export const RocketButtonMark: React.FC<ToolbarFormatProps> = withButtonTooltip(
  withActiveMark(withActiveClass(withButtonRef(withBaseStyleButton(ToolbarMark)))),
);
