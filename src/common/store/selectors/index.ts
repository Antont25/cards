import { Nullable, RootState } from 'common/store/types';
import { CardType, OwnerSwitcherType, PackType } from 'features/PacksList/types';

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

// eslint-disable-next-line no-underscore-dangle
export const selectMyID = (state: RootState): string => state.auth.authData._id;

export const selectPackUserId = (state: RootState): string | undefined =>
  state.cards.dateCard.packUserId;

export const selectCardPacks = (state: RootState): PackType[] =>
  state.packs.packs.cardPacks;

export const selectPage = (state: RootState): number => state.packs.packs.page;

export const selectCardPacksTotalCount = (state: RootState): number =>
  state.packs.packs.cardPacksTotalCount;

export const selectPageCount = (state: RootState): number => state.packs.packs.pageCount;

export const selectMin = (state: RootState): number | undefined =>
  state.packs.queryParams.min;

export const selectMax = (state: RootState): number | undefined =>
  state.packs.queryParams.max;

export const selectOwnerSwitcher = (state: RootState): OwnerSwitcherType =>
  state.packs.filters.ownerSwitcher;

export const selectMaxCardsCount = (state: RootState): number =>
  state.packs.packs.maxCardsCount;

export const selectMinCardsCount = (state: RootState): number =>
  state.packs.packs.minCardsCount;

export const selectValueSearch = (state: RootState): string | undefined =>
  state.packs.queryParams.packName;

export const selectCardPage = (state: RootState): number => state.cards.dateCard.page;

export const selectCardCount = (state: RootState): number =>
  state.cards.dateCard.pageCount;

export const selectCardTotalCount = (state: RootState): number =>
  state.cards.dateCard.cardsTotalCount;

export const selectCardsPackId = (state: RootState): Nullable<string> | undefined =>
  state.cards.queryCardParams.cardsPack_id;
