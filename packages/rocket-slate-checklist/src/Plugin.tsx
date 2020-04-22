import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { getRenderElement, SlatePlugin, withBreakEmptyReset, withDeleteStartReset } from 'slate-plugins-next';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { ActionItemElement, ActionItemProps } from './Element';

import locale from './locales';

const ACTION_ITEM = 'check-list-item';

const resetOptions = {
  types: [ACTION_ITEM],
};

const ActionItemPlugin = (options: { component?: React.ComponentType<ActionItemProps> } = {}): SlatePlugin => {
  const { component } = options;
  const ActionItem = component || ActionItemElement;
  return {
    renderElement: getRenderElement({
      type: ACTION_ITEM,
      component: (props: RenderElementProps) => {
        const { element } = props;
        const editor = useSlate();
        const handlerChangeChecked: React.EventHandler<React.ChangeEvent<any>> = useCallback(
          e => {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, { data: { checked: e.target.checked } }, { at: path });
          },
          [editor, element],
        );
        return <ActionItem onChange={handlerChangeChecked} {...props} />;
      },
    })(),
  };
};

const RocketSlateChecklistPlugin: (options?: RenderElementOptions) => IRocketSlatePlugin = options => ({
  plugin: ActionItemPlugin(options),
  withPlugin: editor => {
    editor.addLocale(locale);
    return withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor));
  },
});

export { RocketSlateChecklistPlugin, ACTION_ITEM };
