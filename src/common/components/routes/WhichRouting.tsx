import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Page404} from '../404/Page404';
import {Login} from '../../../features/auth/login/Login';
import {NewPassword} from '../../../features/auth/new-password/NewPassword';
import {PasswordRecovery} from '../../../features/auth/password-recovery/PasswordRecovery';
import {Profile} from '../../../features/profile/Profile';
import {SignUp} from '../../../features/auth/signUp/SignUp';
import {routePath} from '../../constants/routePath';
import {PacksList} from '../../../features/packsList/PacksList';
import {Cards} from '../../../features/packsList/Cards/Cards';
import {NewPack} from "../../../features/Pack/NewPack";
import {LearnCards} from "../../../features/learnCards/LearnCards";


export const WhichRouting = () => {
    return (
        <Routes>
            <Route index element={<Profile/>}/>
            <Route path={routePath.profile.main} element={<Profile/>}/>
            <Route path={routePath.auth.login} element={<Login/>}/>
            <Route path={routePath.auth.newPass} element={<NewPassword/>}/>
            <Route path={routePath.auth.passRecovery} element={<PasswordRecovery/>}/>
            <Route path={routePath.auth.signUp} element={<SignUp/>}/>
            <Route path={routePath.cards.packList} element={<PacksList/>}/>
            <Route path={routePath.cards.card} element={<Cards/>}/>
            <Route path={routePath.cards.newPack} element={<NewPack/>}/>
            <Route path={routePath.error.notFound} element={<Page404/>}/>
            <Route path={routePath.cards.learnCards} element={<LearnCards/>}/>

        </Routes>
    );
};

