import axios from 'axios';

import { instance } from './config';

import {
  DataPasswordRecoveryType,
  DataUpdatePassword,
  ResponsePasswordRecovery,
} from 'features/auth/password-recovery/types';

export const api = {
  fetchPasswordRecoveryLink: (data: DataPasswordRecoveryType) => {
    return axios.post<ResponsePasswordRecovery>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      data,
    );
  },

  fetchUpdatePassword: (data: DataUpdatePassword) => {
    return instance.post<{ info: string }>('auth/set-new-password', data);
  },
};
