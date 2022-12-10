import axios, { AxiosError } from 'axios';

import { AppDispatch } from '../store/store';

import { setAppErrorAC, setAppStatusAC } from 'app/reducer/app-reducer';

export const handleServerNetworkError = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: AppDispatch,
) => {
  const err = e as Error | AxiosError<{ error: string }>;

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message;

    dispatch(setAppErrorAC(error));
    dispatch(setAppStatusAC('failed'));
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`));
  }
};
