// This is an example with all the plugins enabled 
// It is designed for use as-is
// Copy this file to your project and customize as necessary if you want

import React, { useCallback, useMemo } from 'react'

import { initialEditorState, Element, Leaf } from "rocket-slate"

import { withWysiwyg } from '@rocket-slate/wysiwyg'
import { withPasteHtml } from '@rocket-slate/paste-html'
import { withMentions } from '@rocket-slate/mentions'
import { withLinks } from '@rocket-slate/links'
import { withTables } from '@rocket-slate/table'

import { Editable, withReact, Slate } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'


export default class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = props.initialValue || initialEditorState
  }

  render() {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    const editor = useMemo(
      () => {
        let editor = withHistory(createEditor())
        editor = withReact(withPasteHtml(withTables(withWysiwyg(withLinks(withMentions(editor))))))
        return editor
      },
      []
    )

    return (
      // @ts-ignore
      <Slate editor={editor} value={this.state.value} onChange={value => this.setState({value})}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Paste in some HTML..."
        />
      </Slate>
    )
  }
}

