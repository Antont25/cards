import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { setEmail } from 'features/auth/actions';
import { apiPasswordRecovery } from 'features/auth/api/apiPasswordRecovery';
import { ActionPasswordRecovery } from 'features/auth/enums/ActionPasswordRecovery';
import {
  DataPasswordRecoveryType,
  PasswordRecoveryActionType,
  PasswordRecoveryStateType,
} from 'features/auth/types';

const initialState: PasswordRecoveryStateType = {
  email: null,
};

export const passwordRecoveryReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: PasswordRecoveryActionType,
): PasswordRecoveryStateType => {
  switch (action.type) {
    case ActionPasswordRecovery.SET_EMAIL:
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
        "<div style='background-color: lime; padding: 15px'> password recovery link:<a href='http://localhost:3000/#/set-NewPassword/$token$'>link</a></div>",
    };

    dispatch(setAppStatusAC('loading'));
    try {
      await apiPasswordRecovery.fetchPasswordRecoveryLink(data);

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
      await apiPasswordRecovery.fetchUpdatePassword({ password, resetPasswordToken });

      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
