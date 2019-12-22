import './index.sass';

import React from 'react';
import uniqueId from "lodash-es/uniqueId"
import classNames from 'classnames'

export default class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.id = uniqueId("rocket-slate-checkbox-");
  }

  handleChange = (e) => {
    this.props.onChange(e)
  }

  render() {
    const { className, checked, onChange } = this.props;

    return (
      <span className={classNames("checkbox", className)}>
        <input
          checked={this.props.checked}
          type="checkbox"
          id={this.id}
          disabled={false}
          onChange={(e) => {
            if (onChange) {
              onChange(e);
            }
          }}
        />
        <label htmlFor={this.id} />
      </span>
    );
  }
}
