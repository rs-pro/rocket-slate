import React from 'react';
import { RenderElementProps } from 'slate-react';

export type FCElement = React.FunctionComponent<RenderElementProps>;
export interface IElementsList {
  [key: string]: { pluginName: string; renderFn: FCElement };
}

const Element = (props: RenderElementProps & { elements: IElementsList }) => {
  const { attributes, children, element, elements } = props;
  if (elements[element.type]) {
    const { pluginName, renderFn } = elements[element.type];
    console.log('render element', element.type, 'with function from', pluginName);
    return renderFn(props);
  }
  console.log('render element', element.type, 'with div');
  return <div {...attributes}>{children}</div>;
};

export default Element;
