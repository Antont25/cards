import { SignUpDataType } from 'features/Auth/types';
import {instance} from "app/api/apiApp";

export const apiSignUp = {
  signUp(signUpData: SignUpDataType) {
    return instance.post('auth/register', signUpData);
  },
};
