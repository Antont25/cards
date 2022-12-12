import { ActionsSignUpType } from 'features/auth/components/sign-up/enums';

export const setIsSignUpAC = (isSignUp: boolean) =>
  ({ type: ActionsSignUpType.SET_IS_SIGNUP, isSignUp } as const);
