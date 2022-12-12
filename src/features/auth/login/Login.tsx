import React, { ReactElement } from 'react';

import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Paper,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './style/Login.module.css';

import { RoutePath } from 'common/enums';
import { useAppSelector, useAppDispatch } from 'common/hooks';
import { selectIsAuth } from 'common/store';
import commonStyle from 'common/style/style.module.css';
import { LoginPostDataType } from 'features/auth/auth-api';
import { LoginTC } from 'features/auth/auth-reducer';

const MAX_PASSWORD_LENGTH = 5;

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};
export const Login = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(selectIsAuth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = 'Empty field';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Empty field';
      } else if (values.password.length < MAX_PASSWORD_LENGTH) {
        errors.password = 'Password is too short';
      }

      return errors;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: values => {
      const data: LoginPostDataType = {
        email: formik.values.email,
        password: formik.values.password,
        rememberMe: formik.values.rememberMe,
      };

      dispatch(LoginTC(data));
      formik.resetForm();
    },
  });

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <Paper elevation={20} className={commonStyle.paperStyle}>
      <h3 className={styles.formTitle}>Login</h3>
      <form onSubmit={formik.handleSubmit} className={styles.formBlock}>
        <TextField
          label="Email"
          variant="standard"
          {...formik.getFieldProps('email')}
          onBlur={formik.handleBlur}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
          className={styles.formInput}
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          variant="standard"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          className={styles.formInput}
          margin="normal"
        />
        <FormControlLabel
          label="Remember me"
          className={styles.checkbox}
          control={<Checkbox {...formik.getFieldProps('rememberMe')} />}
        />
        <FormLabel className={styles.forgotPassBlock}>
          <NavLink to="/password-recovery" className={styles.forgotPassLink}>
            Forgot password?
          </NavLink>
        </FormLabel>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={commonStyle.btnStyle}
          disabled={!!formik.errors.email || !!formik.errors.password}
        >
          Login
        </Button>
        <FormLabel className={styles.footer}>
          <p className={styles.footerLabel}>Already have an account?</p>
          <NavLink to={RoutePath.SIGN_UP} className={styles.footerLink}>
            Sign Up
          </NavLink>
        </FormLabel>
      </form>
    </Paper>
  );
};
