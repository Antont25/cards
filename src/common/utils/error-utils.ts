import axios, { AxiosError } from 'axios';

import { setAppErrorAC, setAppStatusAC } from 'app/actions';
import { AppDispatch } from 'common/store';

export const handleServerNetworkError = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: AppDispatch,
): void => {
  const err = e as Error | AxiosError<{ error: string }>;

  if (axios.isAxiosError(err)) {
    // @ts-ignore
    const error = err.response?.data ? err.response.data.error : err.message;

    dispatch(setAppErrorAC(error));
    dispatch(setAppStatusAC('failed'));
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`));
  }
};
