// Customize this file to pick the plugins you want
//
import React from 'react'

import "@rocket-slate/plugin-image"

import { initialEditorState } from "rocket-slate"

import { withHtml } from '@rocket-slate/paste-html'

import { Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'

export default class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: initialValue
    }
  }

  render() {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const editor = useMemo(
      () => withHtml(withReact(withHtml(withHistory(createEditor())))),
      []
    )

    return (
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    )
  }
}

