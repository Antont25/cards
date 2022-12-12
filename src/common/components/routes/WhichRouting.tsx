import React, { ReactElement } from 'react';

import { Route, Routes } from 'react-router-dom';

import { Page404 } from 'common/components/404';
import { RoutePath } from 'common/enums';
import { Login } from 'features/auth/components/login/Login';
import { NewPassword } from 'features/auth/components/new-password/NewPassword';
import { PasswordRecovery } from 'features/auth/components/password-recovery/PasswordRecovery';
import { SignUp } from 'features/auth/components/sign-up/SignUp';
import { LearnCards } from 'features/learn-cards/LearnCards';
import { NewPack } from 'features/pack/NewPack';
import { Cards } from 'features/packs-list/cards/Cards';
import { PacksPage } from 'features/packs-list/PacksPage';
import { Profile } from 'features/profile/Profile';

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
