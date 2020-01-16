import React from "react"
import { addElement, addLeaf } from "rocket-slate"
import { useSlate } from "slate-react"
import { Transforms, Editor } from "slate"

import { Button } from "rocket-slate"

addElement("wysisyg", "block-quote", ({attributes, children}) => <blockquote {...attributes}>{children}</blockquote>)
addElement("wysisyg", "bulleted-list", ({attributes, children}) => <ul {...attributes}>{children}</ul>)
addElement("wysisyg", "numbered-list", ({attributes, children}) => <ol {...attributes}>{children}</ol>)
addElement("wysisyg", "list-item", ({attributes, children}) => <ol {...attributes}>{children}</ol>)

addElement("wysisyg", "heading-one", ({attributes, children}) => <h1 {...attributes}>{children}</h1>)
addElement("wysisyg", "heading-two", ({attributes, children}) => <h2 {...attributes}>{children}</h2>)
addElement("wysisyg", "heading-three", ({attributes, children}) => <h3 {...attributes}>{children}</h3>)
addElement("wysisyg", "heading-four", ({attributes, children}) => <h4 {...attributes}>{children}</h4>)
addElement("wysisyg", "heading-five", ({attributes, children}) => <h5 {...attributes}>{children}</h5>)

addLeaf("wysisyg", "bold", (children) => <strong>{children}</strong>)
addLeaf("wysisyg", "code", (children) => <strong>{children}</strong>)
addLeaf("wysisyg", "italic", (children) => <em>{children}</em>)
addLeaf("wysisyg", "underline", (children) => <u>{children}</u>)

export { default as withWysiwyg } from "./withWysiwyg"

const LIST_TYPES = ['numbered-list', 'bulleted-list', 'checkbox-list']

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true,
    })

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    })

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const BlockButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
        active={isBlockActive(editor, format)}
        onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor, format)
        }}
        >
            {icon}
        </Button>
    )
}

const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            >
                {icon}
        </Button>
    )
}

addButton("wysisyg", "heading-five", ({attributes, children}) => <h5 {...attributes}>{children}</h5>)