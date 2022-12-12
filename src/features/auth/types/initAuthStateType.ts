import { AuthResponseType } from 'features/auth/types/auth-api-type';

export type InitAuthStateType = {
  initializeApp: boolean;
  isAuth: boolean;
  authData: AuthResponseType;
};
