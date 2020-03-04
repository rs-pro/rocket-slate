import React from 'react';
import { RenderElementProps } from 'slate-react';
import { getRenderElement, SlatePlugin, withBreakEmptyReset, withDeleteStartReset} from 'slate-plugins-next';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { IRocketSlatePlugin } from '@rocket-slate/core/Editor';
import { ActionItemElement} from './Element';

const ACTION_ITEM = 'check-list-item';

const resetOptions = {
  types: [ACTION_ITEM],
};

const ActionItemPlugin = (options?: RenderElementOptions): SlatePlugin => {
  return {
    renderElement: getRenderElement({
      type: ACTION_ITEM,
      component: ActionItemElement,
    })(options),
  };
};

const RocketSlateChecklistPlugin: (options?: RenderElementOptions) => IRocketSlatePlugin = (options) => ({
  plugin: ActionItemPlugin(options),
  withPlugin: (editor) => {
    return withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor));
  },
});

export { RocketSlateChecklistPlugin, ACTION_ITEM };
