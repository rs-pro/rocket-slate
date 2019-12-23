import { addElement } from "@rocket-slate"

addElement("wysisyg", "block-quote", ({attributes, children}) => return <blockquote {...attributes}>{children}</blockquote>)
addElement("wysisyg", "bulleted-list", ({attributes, children}) => return <ul {...attributes}>{children}</ul>)
addElement("wysisyg", "numbered-list", ({attributes, children}) => return <ol {...attributes}>{children}</ol>)
addElement("wysisyg", "list-item", ({attributes, children}) => return <ol {...attributes}>{children}</ol>)

addElement("wysisyg", "heading-one", ({attributes, children}) => return <h1 {...attributes}>{children}</h1>)
addElement("wysisyg", "heading-two", ({attributes, children}) => return <h2 {...attributes}>{children}</h2>)
addElement("wysisyg", "heading-three", ({attributes, children}) => return <h3 {...attributes}>{children}</h3>)
addElement("wysisyg", "heading-four", ({attributes, children}) => return <h4 {...attributes}>{children}</h4>)
addElement("wysisyg", "heading-five", ({attributes, children}) => return <h5 {...attributes}>{children}</h5>)

addMark("wysisyg", "bold", (children) => <strong>{children}</strong>)
addMark("wysisyg", "code", (children) => <strong>{children}</strong>)
addMark("wysisyg", "italic", (children) => <em>{children}</em>)
addMark("wysisyg", "underline", (children) => <u>{children}</u>)

