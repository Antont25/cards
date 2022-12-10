import { RootState } from 'common/store/types';

export const selectStatus = (state: RootState): string => state.app.status;

export const selectInitializeApp = (state: RootState): boolean =>
  state.auth.initializeApp;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;

export const selectName = (state: RootState): string => state.auth.authData.name;

export const selectAvatar = (state: RootState): string | undefined =>
  state.auth.authData.avatar;
