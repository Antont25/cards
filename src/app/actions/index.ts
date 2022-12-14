import { AppStatusType } from 'app/types';
import { AppActionType } from 'common/enums';
import { Nullable } from 'common/store';

export const setAppStatusAC = (status: AppStatusType) =>
  ({ type: AppActionType.SET_APP_STATUS, status } as const);

export const setAppErrorAC = (error: Nullable<string>) =>
  ({ type: AppActionType.SET_ERROR, error } as const);
