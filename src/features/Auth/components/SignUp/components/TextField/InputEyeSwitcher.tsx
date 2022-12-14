import React, { memo, ReactElement } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';

type InputAdornmentPropsType = {
  visible: boolean;
  callback: () => void;
};
export const InputEyeSwitcher = memo(
  ({ visible, callback }: InputAdornmentPropsType): ReactElement => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={callback}>
          {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </InputAdornment>
    );
  },
);
