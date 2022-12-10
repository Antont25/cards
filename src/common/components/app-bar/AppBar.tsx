import React, { ReactElement } from 'react';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import styles from './style/AppBar.module.css';
import { UserInfo } from './userInfo';

import logo from 'assets/images/logo1.jpeg';
import { RoutePath } from 'common/enums';
import { useAppSelector } from 'common/hooks';
import { selectAvatar, selectIsAuth, selectName } from 'common/store';

export const AppBar = (): ReactElement => {
  const navigate = useNavigate();

  const isAuth = useAppSelector(selectIsAuth);
  const name = useAppSelector(selectName);
  const avatar = useAppSelector(selectAvatar);

  const onSignInClick = (): void => {
    navigate(RoutePath.LOGIN, { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.inner}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className={styles.logoLink}>
            <img src={logo} alt="logo" className={styles.logoImg} />
          </a>
          <div>
            {isAuth ? (
              <UserInfo name={name} avatar={avatar} />
            ) : (
              <Button className={styles.btn} variant="contained" onClick={onSignInClick}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
