import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { Login } from '../../../features/auth/login/Login';
import { NewPassword } from '../../../features/auth/new-password/NewPassword';
import { PasswordRecovery } from '../../../features/auth/password-recovery/PasswordRecovery';
import { SignUp } from '../../../features/auth/sign-up/SignUp';
import { LearnCards } from '../../../features/learn-cards/LearnCards';
import { NewPack } from '../../../features/pack/NewPack';
import { Cards } from '../../../features/packs-list/cards/Cards';
import { PacksPage } from '../../../features/packs-list/PacksPage';
import { Profile } from '../../../features/profile/Profile';
import { routePath } from '../../constants/routePath';
import { Page404 } from '../404';

export const WhichRouting = () => {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path={routePath.profile.main} element={<Profile />} />
      <Route path={routePath.auth.login} element={<Login />} />
      <Route path={routePath.auth.newPass} element={<NewPassword />} />
      <Route path={routePath.auth.passRecovery} element={<PasswordRecovery />} />
      <Route path={routePath.auth.signUp} element={<SignUp />} />
      <Route path={routePath.cards.packList} element={<PacksPage />} />
      <Route path={routePath.cards.card} element={<Cards />} />
      <Route path={routePath.cards.newPack} element={<NewPack />} />
      <Route path={routePath.error.notFound} element={<Page404 />} />
      <Route path={routePath.cards.learn} element={<LearnCards />}>
        <Route path=":id" element={<LearnCards />} />
      </Route>
    </Routes>
  );
};
