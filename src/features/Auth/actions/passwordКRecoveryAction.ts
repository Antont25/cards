import { ActionPasswordRecovery } from 'features/Auth/enums';

export const setEmail = (email: string) =>
  ({ type: ActionPasswordRecovery.SET_EMAIL, email } as const);
