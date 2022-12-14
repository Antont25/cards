import React, { ChangeEvent, ReactElement, useRef } from 'react';

import Paper from '@mui/material/Paper/Paper';
import { Navigate, NavLink } from 'react-router-dom';

import styles from './style/Profile.module.css';

import { setAppErrorAC } from 'app/actions';
import img from 'assets/images/profileAvatar.jpg';
import { EditableSpan } from 'common/components/editableSpan';
import { RoutePath } from 'common/enums';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectAvatar, selectEmail, selectIsAuth, selectName } from 'common/store';
import commonStyle from 'common/style/style.module.css';
import { convertFileToBase64 } from 'common/utils';
import { changeNameAndAvatarTC, logoutTC } from 'features/Auth/reducer/authReducer';

export const Profile = (): ReactElement => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const name = useAppSelector(selectName);
  const email = useAppSelector(selectEmail);
  const avatar = useAppSelector(selectAvatar);
  const isAuth = useAppSelector(selectIsAuth);

  const avatarImg = avatar || img;

  const onLogoutClick = (): void => {
    dispatch(logoutTC());
  };

  const onNameChange = (name: string): void => {
    dispatch(changeNameAndAvatarTC(name, avatarImg));
  };

  const onAvatarChange = (): void => {
    if (inputRef) inputRef.current?.click();
  };

  const uploadHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      // eslint-disable-next-line no-magic-numbers
      if (e.target.files[0].size / 1024 <= 4096) {
        const file = e.target.files[0];

        convertFileToBase64(file, file64 => {
          dispatch(changeNameAndAvatarTC(name, file64));
        });
      } else {
        dispatch(setAppErrorAC('Incorrect file size'));
      }
    } else {
      dispatch(setAppErrorAC('Upload error'));
    }
  };

  if (!isAuth) {
    return <Navigate to={RoutePath.LOGIN} />;
  }

  return (
    <div className={styles.wrapper}>
      <NavLink className={styles.packsLink} to={RoutePath.PACK_LIST}>
        Back to Packs List
      </NavLink>
      <Paper elevation={20} className={commonStyle.paperStyle}>
        <div className={styles.profileWrapper}>
          <h3 className={styles.title}>Personal Information</h3>
          <div className={styles.avatarBlock}>
            <img className={styles.avatarImg} src={avatarImg} alt="avatar" />
            <label htmlFor="button">
              <button
                aria-label="button"
                type="button"
                onClick={onAvatarChange}
                className={styles.avatarBtn}
              />
              <input
                ref={inputRef}
                className={styles.avatarInput}
                type="file"
                onChange={uploadHandle}
                accept="image/jpeg"
              />
            </label>
          </div>
          <div className={styles.nameBlock}>
            <EditableSpan
              onChangeText={onNameChange}
              value={name}
              label="Nickname"
              className={styles.name}
            />
            <p className={styles.email}>{email}</p>
          </div>
          <button
            aria-label="button"
            type="button"
            className={styles.LogoutBtn}
            onClick={onLogoutClick}
          >
            Log Out
          </button>
        </div>
      </Paper>
    </div>
  );
};
