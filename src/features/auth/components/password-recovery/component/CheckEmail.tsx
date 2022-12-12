import React, { ReactElement } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography';

import icon from 'assets/img/check-email.png';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectEmail, selectIsSignUp } from 'common/store';
import commonStyle from 'common/style/style.module.css';
import { Title } from 'features/auth/components/sign-up/component/title/Title';

export const CheckEmail = ({ onBackToLoginClick }: CheckEmailType): ReactElement => {
  const email = useAppSelector(selectEmail);
  const isRegistered = useAppSelector(selectIsSignUp);

  return (
    <Paper elevation={20} className={commonStyle.paperStyle}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Title isRegistered={isRegistered} headerText="Check Email" />
        <Box sx={{ width: 108, height: 108 }}>
          <img src={icon} alt="email" />
        </Box>
        <Typography
          sx={{ fontSize: 14, mt: 4, textAlign: 'center' }}
          color="text.secondary"
          gutterBottom
        >
          {` We’ve sent an Email with instructions to ${email}`}
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={onBackToLoginClick}
          className={commonStyle.btnStyle}
        >
          Back to login
        </Button>
      </Grid>
    </Paper>
  );
};
// type
type CheckEmailType = {
  onBackToLoginClick?: () => void;
};
