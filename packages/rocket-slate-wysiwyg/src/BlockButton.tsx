import React from "react"
import { Button } from "rocket-slate"
import { useSlate } from "slate-react"
import { t } from "@rocket-slate/i18n"

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