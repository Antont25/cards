import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { setIsSignUpAC } from 'features/auth/actions';
import { apiSignUp } from 'features/auth/api';
import { ActionsSignUp } from 'features/auth/enums';
import { SignUpActionsType, SignUpDataType, SignUpStateType } from 'features/auth/types';

const initState = {
  isSignUp: false,
};

export const signUpReducer = (
  // eslint-disable-next-line default-param-last
  state = initState,
  action: SignUpActionsType,
): SignUpStateType => {
  switch (action.type) {
    case ActionsSignUp.SET_IS_SIGNUP:
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
      await apiSignUp.signUp(data);
      dispatch(setIsSignUpAC(true));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
