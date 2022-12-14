import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { AppActionsType } from 'app';
import { rootReducer } from 'common/store/store';
import {
  AuthActionsType,
  PasswordRecoveryActionType,
  SignUpActionsType,
} from 'features/Auth/types';
import { CardActionType } from 'features/PacksList/types';
import { PacksActionType } from 'features/PacksList/types/PacksActionType';

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
