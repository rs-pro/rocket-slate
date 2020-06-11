import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { useSlate, ReactEditor, useEditor } from 'slate-react';
import { withBaseStyleButton, withButtonTooltip } from '@rocket-slate/editor';
import { insertFiles } from './Plugin';

const UploadButton = withButtonTooltip(styled(withBaseStyleButton('label'))`
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
`);

export const RocketSlateUploadButton: React.FC<{
  className?: string;
  title: string;
  icon?: React.ReactNode;
  accept?: string;
}> = ({ className, icon, title, accept }) => {
  const editor = useSlate();
  const handlerChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    ReactEditor.focus(editor);
    if (files && files.length > 0) {
      insertFiles(editor, files);
    }
  }, []);
  return (
    <UploadButton title={title} className={className}>
      {icon || <FontAwesomeIcon icon={faUpload} />}
      <input type="file" onChange={handlerChangeFile} accept={accept} />
    </UploadButton>
  );
};

export const RocketSlateUploadFilesButton: React.FC<{
  className?: string;
  icon?: React.ReactNode;
  accept?: string;
}> = ({ className, icon, accept }) => {
  const editor = useEditor();
  return (
    <RocketSlateUploadButton
      className={className}
      icon={icon}
      accept={accept}
      title={editor.getLocale('upload.btns.upload_file')}
    />
  );
};

export const RocketSlateUploadImageButton: React.FC<{
  className?: string;
  icon?: React.ReactNode;
}> = ({ className, icon }) => {
  const editor = useEditor();
  return (
    <RocketSlateUploadButton
      className={className}
      icon={icon}
      title={editor.getLocale('upload.btns.upload_image')}
      accept="image/*"
    />
  );
};
