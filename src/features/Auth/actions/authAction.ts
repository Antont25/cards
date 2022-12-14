import { ActionsAuth } from 'features/Auth/enums';
import { AuthResponseType } from 'features/Auth/types';

export const setAuthAC = (data: AuthResponseType): any => {
  return { type: ActionsAuth.SET_AUTH, data } as const;
};

export const logOutAC = (): any => {
  return { type: ActionsAuth.LOGOUT } as const;
};

export const changeNameAndAvatarAC = (name: string, avatar: string): any => {
  return { type: ActionsAuth.CHANGE_NAME_AVATAR, name, avatar } as const;
};

export const setInitializeApp = (value: boolean): any => {
  return { type: ActionsAuth.SET_INITIALIZE_APP, value } as const;
};
