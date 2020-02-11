import React from 'react';
import ButtonMark from './ButtonMark';
import ButtonBlock from './ButtonBlock';

export type IButtonList = Array<
  | {
      name: string;
      type: 'block' | 'mark';
      icon: React.ReactNode;
      format: string;
    }
  | {
      name: string;
      type: 'custom';
      renderFn: React.FunctionComponent;
    }
>;

class Toolbar extends React.PureComponent<{ buttons?: IButtonList }> {
  public renderButtons() {
    const { buttons = [] } = this.props;
    return buttons.map((button) => {
      if (button.type === 'mark') {
        return <ButtonMark key={button.name} {...button} />;
      }
      if (button.type === 'block') {
        return <ButtonBlock key={button.name} {...button} />;
      }
      if (button.type === 'custom') {
        return <React.Fragment key={button.name}>{button.renderFn({})}</React.Fragment>;
      }
      return `{button.${name}} - not implemented type`;
    });
  }

  public render() {
    return <div className="RocketSlateToolbar">{this.renderButtons()}</div>;
  }
}

export default Toolbar;
