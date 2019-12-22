import { PropTypes } from 'prop-types'
import React from 'react'
import { Value } from 'slate'
import classnames from 'classnames'

import initialEditorState from './initialEditorState'

class SlateEditor extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: this.migrateStateVersion(props.initialState || initialEditorState),
      readOnly: false,
      uid: new Date().getUTCMilliseconds()
    }
  }

  //
  // Migrate Slate's Value object
  // Not implemented yet, this is for future updates
  migrateStateVersion (value) {
    return value
  }

  //
  // This function change only the Editor value object
  //
  onChange (change) {
    const value = change.value

    this.setState({ value })

    const { onChange } = this.props
    if (typeCheck.isFunction(onChange)) onChange(value)
  }

  //
  // This function change the SlateEditor state object.
  // It can be change the Editor value object too...
  //
  changeState (state) {
    this.setState(state)
  }

  render () {
    const { children, style, className, plugins } = this.props

    const childProps = {
      plugins,
      value: this.state.value,
      outerState: this.state,
      onChange: this.onChange.bind(this),
      changeState: this.changeState.bind(this)
    }

    return (
      <div className={classnames('rocket-editor--root', className)}>
        {React.cloneElement(children, childProps)}
      </div>
    )
  }
}

SlateEditor.propTypes = {
  initialState: PropTypes.object
}

export default SlateEditor
