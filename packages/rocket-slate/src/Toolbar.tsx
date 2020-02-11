import React from 'react';
import { buttons as pluginButtons } from './plugins';
import ButtonMark from './ButtonMark';
import ButtonBlock from './ButtonBlock';

class Toolbar extends React.PureComponent<{ buttons?: string[] }> {
  public renderButton(name: string, options) {
    if (options.type === 'mark') {
      return <ButtonMark key={name} name={name} icon={options.icon} format={options.format} />;
    }
    if (options.type === 'block') {
      return <ButtonBlock key={name} name={name} icon={options.icon} format={options.format} />;
    }
    return `{button.${name}} - not implemented type`;
  }

  public renderButtons() {
    const { buttons } = this.props;
    if (buttons) {
      return buttons.map((name) => {
        if (pluginButtons[name]) {
          return this.renderButton(name, pluginButtons[name].options);
        }
        return `{button.${name}} - not implemented`;
      });
    }
    return Object.entries(pluginButtons).map(([buttonName, { options }], index) =>
      this.renderButton(buttonName, options),
    );
  }

  public render() {
    return <div className="RocketSlateToolbar">{this.renderButtons()}</div>;
  }
}

export default Toolbar;
