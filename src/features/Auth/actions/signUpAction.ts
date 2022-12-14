import { ActionsSignUp } from 'features/Auth/enums';

export const setIsSignUpAC = (isSignUp: boolean) =>
  ({ type: ActionsSignUp.SET_IS_SIGNUP, isSignUp } as const);
