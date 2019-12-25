import React from "react";
import classNames from "classnames";

import Button from "./Button";
import Tippy from "@tippy.js/react";

import colors from "./colors"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFill } from "@fortawesome/free-solid-svg-icons/faFill";
import { faPalette } from "@fortawesome/free-solid-svg-icons/faPalette";

const Default = {fg: "#000000", bg: "#ffffff"}
const Names = {fg: "Цвет текста", bg: "Цвет фона"}
const Icons = {fg: faPalette, bg: faFill}
const Other = {fg: 'bg', bg: 'fg'}

class ColorToolbar extends React.PureComponent {
  state = {
    fg: false,
    bg: false,
  }

  toggle(kind) {
    var toSet = {}
    if (this.state[kind]) {
      toSet[kind] = false
      this.setState(toSet)
      return
    }

    if (this.has(kind)) {
      let removed = this.remove(kind)
      if (removed) {
        toSet[kind] = false
      } else {
        toSet[kind] = true
      }
    } else {
      toSet[kind] = !this.state[kind]
    }

    if (toSet[kind]) {
      toSet[Other[kind]] = false
    }

    this.setState(toSet)
  }

  has(kind) {
    const {value} = this.props.editorState
    return value.marks.some(mark => mark.type === kind + '_color')
  }

  remove(kind) {
    const { editor, editorState: {value} } = this.props
    const { selection } = value
    //console.log("remove", kind, selection.isExpanded)

    if (this.has(kind) && selection.isExpanded) {
      var removed = false
      value.marks.filter(mark => mark.type === kind + '_color').forEach(mark => {
        editor.removeMark(mark)
        removed = true
      })
      return removed
    }
    return false
  }

  setColor(kind, color) {
    const { editor, editorState: {value} } = this.props

    this.remove(kind)

    if (color !== Default[kind]) {
      editor.addMark({ type: kind + '_color', data: { color } }).focus()
    }

    var toSet = {}
    toSet[kind] = false
    this.setState(toSet)
  }

  renderColor(kind) {
    const cl = classNames("editor__button", {
      "editor__button--active": this.has(kind)
    });

    return (
      <div className="editor__color-group">
        <Tippy content={Names[kind]}>
          <a className={cl}
            onClick={() => this.toggle(kind)}
          >
            <FontAwesomeIcon icon={Icons[kind]} />
          </a>
        </Tippy>
        {this.state[kind] ? (
          <div className="editor__color-dropdown">
            {colors.map ((color) => {
              return (
                <span
                  key={color}
                  className="editor__color"
                  style={{backgroundColor: color}}
                  onClick={() => this.setColor(kind, color)}
                ></span>
              )
            })}
          </div>
        ) : null}
      </div>
    )
  }

  render() {
    return (
      <div key="tbg7" className="editor__toolbar-group">
        {this.renderColor('fg')}
        {this.renderColor('bg')}
      </div>
    )
  }
}

export default ColorToolbar;
