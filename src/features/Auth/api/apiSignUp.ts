import { instance } from 'app/api/app-api';
import { SignUpDataType } from 'features/Auth/types';

export const apiSignUp = {
  signUp(signUpData: SignUpDataType) {
    return instance.post('auth/register', signUpData);
  },
};
