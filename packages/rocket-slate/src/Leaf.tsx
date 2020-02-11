import React from 'react';
import { RenderLeafProps } from 'slate-react';

export type FCLeaf = React.FunctionComponent<RenderLeafProps>;
export interface ILeavesList {
  [key: string]: { pluginName: string; renderFn: FCLeaf };
}

const Leaf = (props: RenderLeafProps & { leaves: ILeavesList }) => {
  const { attributes, children, text, leaf, leaves } = props;

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

export default Leaf;
