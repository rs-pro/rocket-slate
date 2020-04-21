import React from 'react';
import { RenderElementProps } from 'slate-react';
import { getRenderElement, RenderElementOptions } from 'slate-plugins-next';
import { IRocketSlatePlugin } from '@rocket-slate/editor';

export const ALIGNMENT = 'alignment';

const ReactSlateAlignmentElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const {
    data: { align },
  } = element;
  return (
    <div {...attributes} style={{ textAlign: align }} data-slate-type={ALIGNMENT}>
      {children}
    </div>
  );
};

export const RocketSlateAlignmentPlugin = (options?: RenderElementOptions): IRocketSlatePlugin => {
  return {
    plugin: {
      renderElement: getRenderElement({
        type: ALIGNMENT,
        component: ReactSlateAlignmentElement,
      })(options),
    },
  };
};
