import { setIsSignUpAC } from 'features/auth/components/sign-up/actions';

export type SignUpStateType = {
  isSignUp: boolean;
};
export type SignUpActionsType = ReturnType<typeof setIsSignUpAC>;

export type SignUpDataType = {
  email: string;
  password: string;
};

export type SignUpErrorType = {
  error: string;
  email: string;
  in: string;
};
