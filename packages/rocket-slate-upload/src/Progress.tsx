import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { ON_UPLOAD_START, ON_UPLOAD_COMPLETE, ON_UPLOAD_PROGRESS } from './events';

export const withProgres = <T extends { progress: number }>(WrappedComponent: React.ComponentType<T>) => {
  const RocletSlateUploadProgress: React.FunctionComponent = props => {
    const [isShow, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const editor = useSlate();
    ON_UPLOAD_PROGRESS.set(editor, progress => {
      setProgress(progress);
    });
    ON_UPLOAD_COMPLETE.set(editor, () => {
      setShow(false);
    });
    ON_UPLOAD_START.set(editor, () => {
      setShow(true);
    });
    if (isShow) {
      return <WrappedComponent {...({ ...props, progress } as T)} />;
    }
    return null;
  };

  RocletSlateUploadProgress.displayName = `withRocketSlateProgress(${WrappedComponent.name ||
    RocletSlateUploadProgress.displayName})`;

  return RocletSlateUploadProgress;
};
