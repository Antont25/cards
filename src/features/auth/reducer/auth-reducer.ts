import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import {
  changeNameAndAvatarAC,
  logOutAC,
  setAuthAC,
  setInitializeApp,
} from 'features/auth/actions';
import { authAPI } from 'features/auth/api';
import { ActionsAuthType } from 'features/auth/enums';
import {
  AuthActionsType,
  AuthResponseType,
  ChangeNameDataType,
  InitAuthStateType,
  LoginPostDataType,
} from 'features/auth/types';

const initAuthState = {
  initializeApp: false,
  isAuth: false,
  authData: {
    _id: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    created: '',
    updated: '',
    isAdmin: false,
    verified: false,
    rememberMe: false,
    error: '',
  } as AuthResponseType,
};

export const authReducer = (
  // eslint-disable-next-line default-param-last
  state: InitAuthStateType = initAuthState,
  action: AuthActionsType,
): InitAuthStateType => {
  switch (action.type) {
    case ActionsAuthType.SET_AUTH:
      return { ...state, isAuth: true, authData: { ...action.data } };
    case ActionsAuthType.LOGOUT:
      return { ...state, isAuth: false };
    case ActionsAuthType.CHANGE_NAME_AVATAR:
      return {
        ...state,
        authData: { ...state.authData, name: action.name, avatar: action.avatar },
      };
    case ActionsAuthType.SET_INITIALIZE_APP:
      return { ...state, initializeApp: action.value };
    default:
      return state;
  }
};
// Thunk
export const LoginTC =
  (data: LoginPostDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      const res = await authAPI.login(data);

      dispatch(setAuthAC(res));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };

export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'));
  try {
    const res = await authAPI.me();

    dispatch(setAuthAC(res));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    const error = e as AxiosError<{ error: string }>;

    // eslint-disable-next-line no-magic-numbers
    if (error.response?.status !== 401) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  } finally {
    dispatch(setInitializeApp(true));
    dispatch(setAppStatusAC('succeeded'));
  }
};

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'));
  try {
    await authAPI.logout();
    dispatch(logOutAC());
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
  }
};

export const changeNameAndAvatarTC =
  (name: string, avatar: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));

    const data: ChangeNameDataType = {
      name,
      avatar,
    };

    try {
      const res = await authAPI.changeName(data);

      dispatch(changeNameAndAvatarAC(res.updatedUser.name, res.updatedUser.avatar!));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
