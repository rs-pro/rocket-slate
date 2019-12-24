import React from "react";
import Tippy from "@tippy.js/react";

export default class Tooltip extends React.PureComponent {
  render() {
    return (
      <Tippy content={this.props.title}>
        {this.props.children}
      </Tippy>
    )
  }
}
