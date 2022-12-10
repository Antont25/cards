import { setAppErrorAC, setAppStatusAC } from 'app/actions';
import { Nullable } from 'common/store';

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitStateType = {
  status: AppStatusType;
  error: Nullable<string>;
};
export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>;
