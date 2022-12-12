import { PasswordRecoveryActionType } from 'features/auth/password-recovery/enums/ActionPasswordRecoveryType';

export const setEmail = (email: string) =>
  ({ type: PasswordRecoveryActionType.SET_EMAIL, email } as const);
