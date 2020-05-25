import React, { useCallback } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react';
import { getRenderElement, SlatePlugin, withBreakEmptyReset, withDeleteStartReset } from 'slate-plugins-next';
import { RenderElementOptions } from 'slate-plugins-next/dist/elements/types';
import { IRocketSlatePlugin } from '@rocket-slate/editor';
import { RocketSlateChecklistItem, ACTION_ITEM } from './Element';

import locale from './locales';

const resetOptions = {
  types: [ACTION_ITEM],
};

export const setCheckedState = (editor, element, checked) => {
  const path = ReactEditor.findPath(editor, element);
  Transforms.setNodes(editor, { data: { checked } }, { at: path });
};

const ActionComponent: React.FunctionComponent<RenderElementProps> = props => {
  const { element } = props;
  const editor = useSlate();
  const handlerChangeChecked: React.EventHandler<React.ChangeEvent<any>> = useCallback(
    checked => {
      setCheckedState(editor, element, checked);
    },
    [editor, element],
  );
  return <RocketSlateChecklistItem {...props} onChange={handlerChangeChecked} />;
};

const ActionItemPlugin = <T extends React.ComponentType>(options: { component?: T } = {}): SlatePlugin => {
  return {
    renderElement: getRenderElement({
      type: ACTION_ITEM,
      component: ActionComponent,
    })(options),
  };
};

const RocketSlateChecklistPlugin: (options?: RenderElementOptions) => IRocketSlatePlugin = options => ({
  plugin: ActionItemPlugin(options),
  withPlugin: editor => {
    editor.addLocale(locale);
    return withBreakEmptyReset(resetOptions)(withDeleteStartReset(resetOptions)(editor));
  },
});

export { RocketSlateChecklistPlugin };
