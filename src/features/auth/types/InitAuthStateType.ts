import { AuthResponseType } from 'features/auth/types/AuthApiType';

export type InitAuthStateType = {
  initializeApp: boolean;
  isAuth: boolean;
  authData: AuthResponseType;
};
