import { changeNameAndAvatarAC, logOutAC, setAuthAC, setInitializeApp } from '../actions';

export type AuthActionsType =
  | ReturnType<typeof setInitializeApp>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof changeNameAndAvatarAC>
  | ReturnType<typeof setAuthAC>;
