import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { useSlate, ReactEditor } from 'slate-react';
import { RocketTooltip, withBaseStyleButton } from '@rocket-slate/editor';
import { insertFiles } from './Plugin';

const UploadButton = styled(withBaseStyleButton('label'))`
  user-select: none;
  cursor: pointer;
  color: #ccc;
  position: relative;
  > input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0.1;
  }
`;

export const RocketSlateUploadButton = () => {
  const editor = useSlate();
  const handlerChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    ReactEditor.focus(editor);
    if (files && files.length > 0) {
      insertFiles(editor, files);
    }
  }, []);
  return (
    <RocketTooltip title={editor.getLocale('upload.btns.upload_file')}>
      <UploadButton>
        <FontAwesomeIcon icon={faUpload} />
        <input type="file" onChange={handlerChangeFile} />
      </UploadButton>
    </RocketTooltip>
  );
};
