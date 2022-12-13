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
