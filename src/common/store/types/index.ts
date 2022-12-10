import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType } from 'app';
import { rootReducer } from 'common/store/store';
import { AuthActionsType } from 'features/auth/auth-reducer';
import { ActionPasswordRecoveryType } from 'features/auth/password-recovery/password-recovery-reducer';
import { SignUpActionsType } from 'features/auth/sign-up/signUp-reducer';
import { CardReducerActionType } from 'features/packs-list/cards/cards-reducer';
import { PacksActionType } from 'features/packs-list/packs-reducer';

export type ActionsType =
  | AppActionsType
  | SignUpActionsType
  | AuthActionsType
  | ActionPasswordRecoveryType
  | CardReducerActionType
  | PacksActionType;

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionsType
>;

export type Nullable<T> = T | null;
