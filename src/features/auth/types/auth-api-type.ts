import { Nullable } from 'common/store';

export type LoginPostDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type AuthResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date | string;
  updated: Date | string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;

  error?: Nullable<string>;
};

export type LogoutType = {
  info: string;
  error?: string;
};

export type ChangeNameDataType = {
  name: string;
  avatar: string;
};
export type ChangeNameResponseType = {
  updatedUser: AuthResponseType;
  error?: string;
};
