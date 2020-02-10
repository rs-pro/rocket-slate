import React from 'react';

const elements = {};
const addElement = (pluginName, typeName, RenderFunction) => {
  if (elements[typeName]) {
    throw new Error(
      `Error: cannot register element ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`,
    );
  }
  elements[typeName] = { pluginName, RenderFunction };
};

const leaves = {};
const addLeaf = (pluginName, typeName, RenderFunction) => {
  if (elements[typeName]) {
    throw new Error(
      `Error: cannot register leaf ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`,
    );
  }
  leaves[typeName] = { pluginName, RenderFunction };
};

export { elements, addElement, leaves, addLeaf };

const Element = ({ attributes, children, element }) => {
  if (elements[element.type]) {
    const { pluginName, RenderFunction } = elements[element.type];
    console.log(
      'render element',
      element.type,
      'with function from',
      pluginName,
    );
    return <RenderFunction {...attributes}>{children}</RenderFunction>;
  }

  console.log('render element', element.type, 'with div');
  return <div {...attributes}>{children}</div>;
};

const Leaf = ({ attributes, children, leaf }) => {
  Object.keys(elements).forEach((typeName) => {
    if (leaf[typeName]) {
      const { pluginName, RenderFunction } = leaf[typeName];
      console.log('render leaf', typeName, 'with function from', pluginName);
      children = RenderFunction(children);
    }
  });

  return <span {...attributes}>{children}</span>;
};

export { Element, Leaf };

const buttons = {};
const addButton = (pluginName, buttonName, Button) => {
  if (buttons[buttonName]) {
    throw new Error(
      `Error: cannot register button ${buttonName} from ${pluginName} - already registered by ${buttons[buttonName].pluginName}`,
    );
  }
  buttons[buttonName] = { pluginName, Button };
};

export { buttons, addButton };
