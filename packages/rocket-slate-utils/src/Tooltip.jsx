import React from "react";
import Tippy from "@tippy.js/react";

export default class Tooltip extends React.PureComponent {
  return (
    <Tippy content={this.props.title}>
      {this.props.children}
    </Tippy>
  )
}
