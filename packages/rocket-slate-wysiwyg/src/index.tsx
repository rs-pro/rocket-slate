import React from "react"
import { addElement, addLeaf, addButton } from "rocket-slate"

export { default as withWysiwyg } from "./withWysiwyg"

import BlockButton from "./BlockButton"
import MarkButton from "./MarkButton"

import { faBold } from "@fortawesome/free-solid-svg-icons/faBold"
import { faItalic } from "@fortawesome/free-solid-svg-icons/faItalic"
import { faUnderline } from "@fortawesome/free-solid-svg-icons/faUnderline"
import { faStrikethrough } from "@fortawesome/free-solid-svg-icons/faStrikethrough"
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode"
import { faFileCode } from "@fortawesome/free-solid-svg-icons/faFileCode"
import { faH1 } from "@fortawesome/free-solid-svg-icons/faH1"
import { faH2 } from "@fortawesome/free-solid-svg-icons/faH2"
import { faH3 } from "@fortawesome/free-solid-svg-icons/faH3"
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons/faQuoteRight"
import { faListOl } from "@fortawesome/free-solid-svg-icons/faListOl"
import { faListUl } from "@fortawesome/free-solid-svg-icons/faListUl"



addElement("wysisyg", "block-quote", ({attributes, children}) => <blockquote {...attributes}>{children}</blockquote>)
addElement("wysisyg", "bulleted-list", ({attributes, children}) => <ul {...attributes}>{children}</ul>)
addElement("wysisyg", "numbered-list", ({attributes, children}) => <ol {...attributes}>{children}</ol>)
addElement("wysisyg", "list-item", ({attributes, children}) => <ol {...attributes}>{children}</ol>)

addElement("wysisyg", "heading-one", ({attributes, children}) => <h1 {...attributes}>{children}</h1>)
addButton("wysisyg", "heading-one"", () => <BlockButton name="heading-one" format="heading-one" icon="looks_one" />)
addElement("wysisyg", "heading-two", ({attributes, children}) => <h2 {...attributes}>{children}</h2>)
addElement("wysisyg", "heading-three", ({attributes, children}) => <h3 {...attributes}>{children}</h3>)
addElement("wysisyg", "heading-four", ({attributes, children}) => <h4 {...attributes}>{children}</h4>)
addElement("wysisyg", "heading-five", ({attributes, children}) => <h5 {...attributes}>{children}</h5>)


addLeaf("wysisyg", "bold", ({attributes, children}) => <h5 {...attributes}>{children}</h5>)
addButton("wysisyg", "bold", () => <MarkButton name="bold" format="bold" icon="format_bold" />)

addLeaf("wysisyg", "code", (children) => <strong>{children}</strong>)
addLeaf("wysisyg", "italic", (children) => <em>{children}</em>)
addLeaf("wysisyg", "underline", (children) => <u>{children}</u>)
