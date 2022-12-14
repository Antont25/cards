import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Page404 } from 'common/components/404';
import { RoutePath } from 'common/enums';
import { Login } from 'features/Auth/components/Login/Login';
import { NewPassword } from 'features/Auth/components/NewPassword/NewPassword';
import { PasswordRecovery } from 'features/Auth/components/PasswordRecovery/PasswordRecovery';
import { SignUp } from 'features/Auth/components/SignUp/SignUp';
import { LearnCards } from 'features/LearnCards/LearnCards';
import { NewPack } from 'features/Pack/NewPack';
import { Cards } from 'features/PacksList/components/Cards/Cards';
import { PacksPage } from 'features/PacksList/PacksPage';
import { Profile } from 'features/Profile/Profile';

export const WhichRouting = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path={RoutePath.PROFILE} element={<Profile />} />
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.NEW_PASS} element={<NewPassword />} />
      <Route path={RoutePath.PASS_RECOVERY} element={<PasswordRecovery />} />
      <Route path={RoutePath.SIGN_UP} element={<SignUp />} />
      <Route path={RoutePath.PACK_LIST} element={<PacksPage />} />
      <Route path={RoutePath.CARD} element={<Cards />} />
      <Route path={RoutePath.NEW_PACK} element={<NewPack />} />
      <Route path={RoutePath.NOTE_FOUND} element={<Page404 />} />
      <Route path={RoutePath.LEARN} element={<LearnCards />}>
        <Route path=":id" element={<LearnCards />} />
      </Route>
    </Routes>
  );
};
