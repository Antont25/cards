import { ActionsSignUp } from 'features/auth/enums';

export const setIsSignUpAC = (isSignUp: boolean) =>
  ({ type: ActionsSignUp.SET_IS_SIGNUP, isSignUp } as const);
