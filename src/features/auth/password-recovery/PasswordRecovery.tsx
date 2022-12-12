import React, { useCallback } from 'react';

import { Box, FormGroup } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl/FormControl';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import commonStyle from '../../../common/style/style.module.css';
import { Title } from '../sign-up/title/Title';

import { CheckEmail } from './CheckEmail';

import { setAppStatusAC } from 'app/reducer/app-reducer';
import { passwordRecoveryLink } from 'features/auth/password-recovery/reducer/password-recovery-reducer';

export const PasswordRecovery = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.app.status);
  const isRegistered = useAppSelector(state => state.signUp.isSignUp);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      dispatch(passwordRecoveryLink(values.email));
      formik.resetForm();
    },
  });
  const disabled = formik.touched.email && !!formik.errors.email;

  const onClickBackToLogin = useCallback(() => {
    dispatch(setAppStatusAC('idle'));
    navigate('/login');
  }, []);

  if (status === 'succeeded') {
    return <CheckEmail onClickBackToLogin={onClickBackToLogin} />;
  }

  return (
    <Paper elevation={20} className={commonStyle.paperStyle}>
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Title isRegistered={isRegistered} headerText="Forgot your password?" />
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                error={formik.errors.email !== undefined}
                helperText={formik.errors.email}
                // disabled={isLoading}
                label="Email"
                variant="standard"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              <Typography sx={{ mt: 4 }} color="text.secondary">
                Enter your email address and we will send you further instructions
              </Typography>
              <Button
                variant="contained"
                type="submit"
                disabled={disabled}
                className={commonStyle.btnStyle}
              >
                Send Instructions
              </Button>
            </FormGroup>
          </FormControl>
        </form>
        <Typography sx={{ fontSize: 14, mt: 4 }} color="text.secondary" gutterBottom>
          Did you remember your password?
        </Typography>

        <Button size="small" onClick={onClickBackToLogin}>
          <Box sx={{ borderBottom: 2, lineHeight: 1 }}>Try logging in</Box>
        </Button>
      </Grid>
    </Paper>
  );
};
