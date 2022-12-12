import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { setEmail } from 'features/auth/password-recovery/actions';
import { api } from 'features/auth/password-recovery/api/api-password-recovery';
import { PasswordRecoveryActionType } from 'features/auth/password-recovery/enums/ActionPasswordRecoveryType';
import {
  ActionPasswordRecoveryType,
  DataPasswordRecoveryType,
  PasswordRecoveryType,
} from 'features/auth/password-recovery/types';

const initialState: PasswordRecoveryType = {
  email: null,
};

export const passwordRecoveryReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ActionPasswordRecoveryType,
): PasswordRecoveryType => {
  switch (action.type) {
    case PasswordRecoveryActionType.SET_EMAIL:
      return { ...state, email: action.email };
    default:
      return state;
  }
};

// thunk
export const passwordRecoveryLink =
  (email: string): AppThunk =>
  async dispatch => {
    const data: DataPasswordRecoveryType = {
      email,
      message:
        "<div style='background-color: lime; padding: 15px'> password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>",
    };

    dispatch(setAppStatusAC('loading'));
    try {
      await api.fetchPasswordRecoveryLink(data);

      dispatch(setEmail(email));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
export const updatePassword =
  (password: string, resetPasswordToken: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      await api.fetchUpdatePassword({ password, resetPasswordToken });

      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
