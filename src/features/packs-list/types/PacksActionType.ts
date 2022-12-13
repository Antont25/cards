import {
  filterPacksWithOwnerSwitcherAC,
  setPacksAC,
  updateQueryParamsAC,
} from 'features/packs-list/reducers/packsReducer';

export type PacksActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof updateQueryParamsAC>
  | ReturnType<typeof filterPacksWithOwnerSwitcherAC>;
