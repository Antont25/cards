import React, { ReactElement, useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './style/UserInfo.module.css';

import defaultAvatar from 'assets/images/profileAvatar.jpg';
import { RoutePath } from 'common/enums';
import { useAppDispatch } from 'common/hooks';
import { logoutTC } from 'features/Auth/reducer/authReducer';

type UserInfoPropsType = {
  name: string;
  avatar?: string;
};

export const UserInfo = ({ name, avatar }: UserInfoPropsType): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [width, setWidth] = useState(0);

  const onLogOutClick = (): void => {
    dispatch(logoutTC());

    navigate(RoutePath.LOGIN, { replace: true });
  };

  const avatarImg = avatar || defaultAvatar;

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavLink to="/profile" className={styles.userName}>
        {name}
      </NavLink>
      <img className={styles.avatarImg} src={avatarImg} alt="avatar" />
      {/* eslint-disable-next-line no-magic-numbers */}
      {width > 991 && (
        <Button size="small" variant="contained" onClick={onLogOutClick}>
          Log Out
        </Button>
      )}
    </div>
  );
};
