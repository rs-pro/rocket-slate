import React from 'react'
import { Button } from '@rocket-slate/core'
import { useSlate } from 'slate-react'
import { t } from '@rocket-slate/i18n'
import { isBlockActive, toggleBlock } from './util'

const BlockButton = ({ name, format, icon }) => {
    const editor = useSlate()
    return (
        <Button
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor, format)
        }}
        title={t(`toolbar.wysiwyg.${name}`)}
        >
            {icon}
        </Button>
    )
}

export default BlockButton
