import { instance } from 'app/api';
import {
  AuthResponseType,
  ChangeNameDataType,
  ChangeNameResponseType,
  LoginPostDataType,
  LogoutType,
} from 'features/auth/types';

export const apiAuth = {
  login(data: LoginPostDataType) {
    return instance.post<AuthResponseType>('auth/login', data).then(res => res.data);
  },

  me() {
    return instance.post<AuthResponseType>('auth/me', {}).then(res => res.data);
  },

  logout() {
    return instance.delete<LogoutType>('auth/me', {}).then(res => res.data);
  },

  changeName(data: ChangeNameDataType) {
    return instance.put<ChangeNameResponseType>('auth/me', data).then(res => res.data);
  },
};
