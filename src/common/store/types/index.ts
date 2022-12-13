import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType } from 'app';
import { rootReducer } from 'common/store/store';
import {
  AuthActionsType,
  PasswordRecoveryActionType,
  SignUpActionsType,
} from 'features/auth/types';
import { CardActionType } from 'features/packs-list/reducers/cardsReducer';
import { PacksActionType } from 'features/packs-list/types/PacksActionType';

export type ActionsType =
  | AppActionsType
  | SignUpActionsType
  | AuthActionsType
  | PasswordRecoveryActionType
  | CardActionType
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
