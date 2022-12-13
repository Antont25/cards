import { Nullable, RootState } from 'common/store/types';
import { CardType } from 'features/packs-list/api/apiCards';

export const selectStatus = (state: RootState): string => state.app.status;

export const selectInitializeApp = (state: RootState): boolean =>
  state.auth.initializeApp;

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;

export const selectName = (state: RootState): string => state.auth.authData.name;

export const selectAvatar = (state: RootState): string | undefined =>
  state.auth.authData.avatar;

export const selectEmail = (state: RootState): Nullable<string> =>
  state.passwordRecovery.email;

export const selectIsSignUp = (state: RootState): boolean => state.signUp.isSignUp;

export const selectCards = (state: RootState): CardType[] => state.cards.dateCard.cards;

export const selectPackName = (state: RootState): string | undefined =>
  state.cards.dateCard.packName;

export const selectMyID = (state: RootState): string => state.auth.authData.id;

export const selectCardsPackId = (state: RootState): string | undefined =>
  state.cards.dateCard.packUserId;
