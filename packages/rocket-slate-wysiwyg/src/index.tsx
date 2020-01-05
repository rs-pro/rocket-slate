import React from "react"
import { addElement, addMark } from "rocket-slate"

addElement("wysisyg", "block-quote", ({attributes, children}) => <blockquote {...attributes}>{children}</blockquote>)
addElement("wysisyg", "bulleted-list", ({attributes, children}) => <ul {...attributes}>{children}</ul>)
addElement("wysisyg", "numbered-list", ({attributes, children}) => <ol {...attributes}>{children}</ol>)
addElement("wysisyg", "list-item", ({attributes, children}) => <ol {...attributes}>{children}</ol>)

addElement("wysisyg", "heading-one", ({attributes, children}) => <h1 {...attributes}>{children}</h1>)
addElement("wysisyg", "heading-two", ({attributes, children}) => <h2 {...attributes}>{children}</h2>)
addElement("wysisyg", "heading-three", ({attributes, children}) => <h3 {...attributes}>{children}</h3>)
addElement("wysisyg", "heading-four", ({attributes, children}) => <h4 {...attributes}>{children}</h4>)
addElement("wysisyg", "heading-five", ({attributes, children}) => <h5 {...attributes}>{children}</h5>)

addMark("wysisyg", "bold", (children) => <strong>{children}</strong>)
addMark("wysisyg", "code", (children) => <strong>{children}</strong>)
addMark("wysisyg", "italic", (children) => <em>{children}</em>)
addMark("wysisyg", "underline", (children) => <u>{children}</u>)

export { default as withWysiwyg } from "./withWysiwyg"
