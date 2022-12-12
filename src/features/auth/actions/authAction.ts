import { ActionsAuthType } from 'features/auth/enums';
import { AuthResponseType } from 'features/auth/types';

export const setAuthAC = (data: AuthResponseType): any => {
  return { type: ActionsAuthType.SET_AUTH, data } as const;
};

export const logOutAC = (): any => {
  return { type: ActionsAuthType.LOGOUT } as const;
};

export const changeNameAndAvatarAC = (name: string, avatar: string): any => {
  return { type: ActionsAuthType.CHANGE_NAME_AVATAR, name, avatar } as const;
};

export const setInitializeApp = (value: boolean): any => {
  return { type: ActionsAuthType.SET_INITIALIZE_APP, value } as const;
};
