import React from "react"
import { Button } from "rocket-slate"
import { useSlate } from "slate-react"
import { t } from "@rocket-slate/i18n"

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