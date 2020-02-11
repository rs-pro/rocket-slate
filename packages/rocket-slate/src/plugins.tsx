import React from 'react';
import { RenderElementProps, RenderLeafProps } from 'slate-react';

interface IOptionsButton {
  icon?: React.ReactNode;
  title?: string;
  type: 'mark' | 'block';
  format: string;
}

type FCElement = React.FunctionComponent<RenderElementProps>;
type FCLeaf = React.FunctionComponent<RenderLeafProps>;

const elements: { [key: string]: { pluginName: string; renderFn: FCElement } } = {};
const leaves: { [key: string]: { pluginName: string; renderFn: FCLeaf } } = {};
const buttons: { [key: string]: { pluginName: string; options: IOptionsButton } } = {};

const addElement = (pluginName: string, typeName: string, renderFn: FCElement) => {
  if (elements[typeName]) {
    if (elements[typeName].pluginName !== pluginName) {
      throw new Error(
        `Error: cannot register element ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`,
      );
    }
  }
  elements[typeName] = { pluginName, renderFn };
};

const addLeaf = (pluginName: string, typeName: string, renderFn: FCLeaf) => {
  if (leaves[typeName]) {
    if (leaves[typeName].pluginName !== pluginName) {
      throw new Error(
        `Error: cannot register leaf ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`,
      );
    }
  }
  leaves[typeName] = { pluginName, renderFn };
};

const addButton = (pluginName: string, buttonName: string, options: IOptionsButton) => {
  if (buttons[buttonName]) {
    if (buttons[buttonName].pluginName !== pluginName) {
      throw new Error(
        `Error: cannot register button ${buttonName} from ${pluginName} - already registered by ${buttons[buttonName].pluginName}`,
      );
    }
  }
  buttons[buttonName] = { pluginName, options };
};

export { elements, addElement, leaves, addLeaf, buttons, addButton };

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  if (elements[element.type]) {
    const { pluginName, renderFn } = elements[element.type];
    console.log('render element', element.type, 'with function from', pluginName);
    return renderFn(props);
  }
  console.log('render element', element.type, 'with div');
  return <div {...attributes}>{children}</div>;
};

const Leaf = (props: RenderLeafProps) => {
  const { attributes, children, text, leaf } = props;

  return (
    <span {...attributes}>
      {Object.keys(leaves).reduce((accChildren, typeName) => {
        if (leaf[typeName]) {
          const { pluginName, renderFn } = leaves[typeName];
          console.log('render leaf', typeName, 'with function from', pluginName);
          return renderFn({ attributes, leaf, text, children: accChildren });
        }
        return accChildren;
      }, children)}
    </span>
  );
};

export { Element, Leaf };
