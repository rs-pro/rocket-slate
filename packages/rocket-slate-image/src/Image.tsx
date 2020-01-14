import React from 'react'
import classNames from "classnames"
import { Resizable } from "re-resizable";

/**
 * Image node renderer.
 *
 * @type {Component}
 */

class Image extends React.PureComponent<any, any> {
  private image = React.createRef<HTMLImageElement>()

  getClasses() {
    const { selected } = this.props

    return classNames("editor__content-image", {
      "editor__content-image--focused": selected
    })
  }

  renderInner() {
    const src = this.getSrc()
    return (
      <a href={src} target="_blank">
        <img alt="" src={src} ref={this.image} />
      </a>
    )
  }

  getSrc() {
    const { data } = this.props.node
    const src = data.get("src")
    return src
  }

  getSize() {
    const { data } = this.props.node
    const size = {
      width: data.get("width"),
      height: data.get("height")
    }
    return size
  }

  renderReadonly() {
    const { attributes } = this.props
    const size = this.getSize()

    return (
      <span
        className={this.getClasses()}
        {...attributes}
        style={{
          width: size.width + "px",
          height: size.height + "px",
        }}
      >
        {this.renderInner()}
      </span>
    )
  }

  renderResizer() {
    const { attributes } = this.props
    const { editor, node } = this.props

    const size = this.getSize()
    const src = this.getSrc()
    return (
      <Resizable
        className={this.getClasses()}
        size={size}
        onResizeStop={(e, direction, ref, d) => {
          if (this.image.current) {
            const width = this.image.current.width
            const height = this.image.current.height
            editor.setNodeByKey(node.key, {
              data: {
                src,
                width,
                height
              },
            })
          }
        }}
        {...attributes}
      >
        {this.renderInner()}
      </Resizable>
    )
  }

  renderLoading() {
    const { attributes } = this.props

    return (
      <span
        className={this.getClasses()}
        {...attributes}
      >
        Loading...
      </span>
    )
  }

  render() {
    const { selected, editor } = this.props
    const { data } = this.props.node
    const src = data.get("src")
    if (!src) {
      return this.renderLoading()
    }
    if (editor.props.readOnly) {
      return this.renderReadonly()
    }
    return this.renderResizer()
  }
}

export default Image
