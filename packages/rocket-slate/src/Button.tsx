import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { ToolbarButton, ToolbarMark, ToolbarBlock, ToolbarButtonProps } from 'slate-plugins-next';
import { ToolbarFormatProps } from 'slate-plugins-next/dist/common/types';

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

export const RocketButton: React.FC<ToolbarButtonProps> = withButtonRef(withBaseStyleButton(ToolbarButton));
export const RocketButtonBlock: React.FC<ToolbarFormatProps> = withButtonRef(withBaseStyleButton(ToolbarBlock));
export const RocketButtonMark: React.FC<ToolbarFormatProps> = withButtonRef(withBaseStyleButton(ToolbarMark));
