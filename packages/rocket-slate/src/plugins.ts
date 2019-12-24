import React from 'react'

var elements = {};
const addElement = function(pluginName, typeName, RenderFunction){
  if (elements[typeName]) {
    throw `Error: cannot register element ${typeName} from ${$pluginName} - already registered by ${elements[typeName].pluginName}`
  }
  elements[typeName] = { pluginName, RenderFunction }
};

var leaves = {};
const addLeaf = function(pluginName, typeName, RenderFunction){
  if (elements[typeName]) {
    throw `Error: cannot register leaf ${typeName} from ${$pluginName} - already registered by ${elements[typeName].pluginName}`
  }
  leaves[typeName] = { pluginName, RenderFunction }
};

export { elements, addElement, leaves, addLeaf }

const Element = ({ attributes, children, element }) => {
  const { pluginName, RenderFunction } = elements[element.type];
  if (RenderFunction) {
    console.log("render element", element.type, "with function from", pluginName)
    return <RenderFunction {...attributes}>{children}</RenderFunction>
  }
  return <div {...attributes}>{children}</div>
}

const Leaf = ({ attributes, children, leaf }) => {
  Object.keys(elements).forEach(function(typeName) {
    if (leaf[typeName]) {
      const { pluginName, RenderFunction } = leaf[typeName];
      console.log("render leaf", typeName, "with function from", pluginName)
      children = RenderFunction(children);
    }
  })

  return <span {...attributes}>{children}</span>
}

export { Element, Leaf }
