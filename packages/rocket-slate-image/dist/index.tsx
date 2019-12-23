import React from 'react'

import Image from "./Image"
addElement("wysisyg", "image", ({attributes, children}) => return <Image {...attributes} />)

