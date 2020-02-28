import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

import { RocketButton, RocketTooltip } from '@rocket-slate/core';

export const RocketSlateUploadButton = () => {
  return (
    <RocketTooltip title="Загрузить файл">
      <RocketButton icon={<FontAwesomeIcon icon={faUpload} />} />
    </RocketTooltip>
  );
};
