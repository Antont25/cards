import { ActionPasswordRecovery } from 'features/auth/enums';

export const setEmail = (email: string) =>
  ({ type: ActionPasswordRecovery.SET_EMAIL, email } as const);
