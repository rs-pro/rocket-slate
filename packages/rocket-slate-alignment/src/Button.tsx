import React, { useCallback } from 'react';
import { useSlate } from 'slate-react';
import { RocketTooltip, RocketButton } from '@rocket-slate/editor';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ALIGNMENT } from './Plugin';

export const RocketSlateAlignmentButton: React.FC<{ type: 'left' | 'center' | 'right' }> = () => {
  const editor = useSlate();
  const handlerMouseDownLinkButton = useCallback((event: React.MouseEvent<any>) => {

  }, [editor]);
  return (
    <RocketTooltip title="Выравнивание текста">
      <RocketButton icon={<div />} onMouseDown={handlerMouseDownLinkButton} />
    </RocketTooltip>
  );
};
