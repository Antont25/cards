import React, { ReactElement, useEffect } from 'react';
import 'app/style/App.module.css';

import { LinearProgress } from '@mui/material';

import { AppBar } from 'common/components/app-bar/AppBar';
import { ErrorSnackbar } from 'common/components/errorSnackbar/ErrorSnackbar';
import { Loading } from 'common/components/loading';
import { WhichRouting } from 'common/components/routes/WhichRouting';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectInitializeApp, selectStatus } from 'common/store';
import { initializeAppTC } from 'features/auth/reducer/authReducer';

export const App = (): ReactElement => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const initializeApp = useAppSelector(selectInitializeApp);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!initializeApp) {
    return <Loading />;
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar />
      {status === 'loading' ? (
        <LinearProgress className="adaptivePadding" />
      ) : (
        <div className="adaptivePadding" style={{ height: '4px' }} />
      )}
      <div className="container">
        <WhichRouting />
      </div>
    </div>
  );
};
