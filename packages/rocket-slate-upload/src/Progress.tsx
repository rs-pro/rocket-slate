import React, { useState} from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
import { ON_UPLOAD_START, ON_UPLOAD_COMPLETE, ON_UPLOAD_PROGRESS } from './events';

const ProgressContainer = styled.div`
  display: flex;
  position: relative;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

const ProgressValue = styled.div`
  position: relative;
  flex-grow: 1;
  color: #000;
  text-align: center;
`;

export const RocketSlateUploadProgress: React.FunctionComponent<{ color?: string }> = (props) => {
  const { color = '#4987ff' } = props;
  const [isShow, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const editor = useSlate();

  ON_UPLOAD_PROGRESS.set(editor, (progress) => {
    console.log('ON_UPLOAD_PROGRESS');
    setProgress(progress);
  });
  ON_UPLOAD_COMPLETE.set(editor, () => {
    console.log('ON_UPLOAD_COMPLETE');
    setShow(false);
  });
  ON_UPLOAD_START.set(editor, () => {
    console.log('ON_UPLOAD_START');
    setShow(true);
  });

  if (isShow) {
    return (
      <ProgressContainer>
        <ProgressBar style={{ width: `${progress}%`, backgroundColor: color }} />
        <ProgressValue>{progress}</ProgressValue>
      </ProgressContainer>
    );
  }

  return null;
};
