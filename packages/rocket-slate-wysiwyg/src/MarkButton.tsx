import React from "react"
import { useSlate } from 'slate-react'
import { Button } from '@rocket-slate/core'
import { t } from '@rocket-slate/i18n'
import { isMarkActive, toggleMark } from './util';

const MarkButton = ({ name, format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            title={t(`toolbar.wysiwyg.${name}`)}
            >
                {icon}
        </Button>
    )
}


export default MarkButton
