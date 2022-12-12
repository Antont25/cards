import { PasswordRecoveryActionType } from 'features/auth/components/password-recovery/enums/ActionPasswordRecoveryType';

export const setEmail = (email: string) =>
  ({ type: PasswordRecoveryActionType.SET_EMAIL, email } as const);
