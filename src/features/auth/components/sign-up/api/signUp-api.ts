import { instance } from 'app/api/app-api';
import { SignUpDataType } from 'features/auth/components/sign-up/types';

export const signUpApi = {
  signUp(signUpData: SignUpDataType) {
    return instance.post('auth/register', signUpData);
  },
};
