import { Nullable } from 'common/store';
import { setEmail } from 'features/auth/components/password-recovery/actions';

export type DataPasswordRecoveryType = {
  email: string;
  from?: string;
  message: string;
};

export type ResponsePasswordRecovery = {
  info: string;
  success: boolean;
  answer: boolean;
};

export type DataUpdatePassword = {
  password: string;
  resetPasswordToken: string;
};

export type ActionPasswordRecoveryType = ReturnType<typeof setEmail>;

export type PasswordRecoveryType = {
  email: Nullable<string>;
};
