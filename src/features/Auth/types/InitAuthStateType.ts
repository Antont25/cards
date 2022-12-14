import { AuthResponseType } from 'features/Auth/types/AuthApiType';

export type InitAuthStateType = {
  initializeApp: boolean;
  isAuth: boolean;
  authData: AuthResponseType;
};
