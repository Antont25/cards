import React, { memo, ReactElement } from 'react';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Avatar, Typography } from '@mui/material';

import style from 'features/Auth/components/SignUp/components/Title/style/title.module.css';

const avatarStyle = { backgroundColor: 'white' };

type TitlePropsType = {
  isRegistered: boolean;
  typographyText?: string;
  headerText: string;
};
export const Title = memo(
  ({ isRegistered, typographyText, headerText }: TitlePropsType): ReactElement => {
    return (
      <div className={style.titleContainer}>
        <Avatar style={avatarStyle}>
          <HowToRegIcon color={isRegistered ? 'success' : 'primary'} />
        </Avatar>
        <h2>{headerText}</h2>
        {typographyText && (
          <Typography gutterBottom variant="caption">
            {typographyText}
          </Typography>
        )}
      </div>
    );
  },
);
