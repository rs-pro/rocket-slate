import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { ToolbarButton, ToolbarButtonProps } from 'slate-plugins-next';

const baseStyleButton = css`
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

const withRef = <T extends {}>(Component: React.FunctionComponent<T>) => {
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

export const withBaseStyleButton = <T extends ToolbarButtonProps>(Component: React.FunctionComponent<T>) => styled(
  withRef<T>(Component),
)`
  ${baseStyleButton}
`;

export const RocketButton: React.FC<ToolbarButtonProps> = withBaseStyleButton(ToolbarButton);
