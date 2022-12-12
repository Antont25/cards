import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { setIsSignUpAC } from 'features/auth/components/sign-up/actions';
import { signUpApi } from 'features/auth/components/sign-up/api';
import { ActionsSignUpType } from 'features/auth/components/sign-up/enums';
import {
  SignUpActionsType,
  SignUpDataType,
  SignUpStateType,
} from 'features/auth/components/sign-up/types';

const initState = {
  isSignUp: false,
};

export const signUpReducer = (
  // eslint-disable-next-line default-param-last
  state = initState,
  action: SignUpActionsType,
): SignUpStateType => {
  switch (action.type) {
    case ActionsSignUpType.SET_IS_SIGNUP:
      return { ...state, isSignUp: action.isSignUp };
    default:
      return state;
  }
};
// ---Thunks---
export const signUpTC =
  (data: SignUpDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      await signUpApi.signUp(data);
      dispatch(setIsSignUpAC(true));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
