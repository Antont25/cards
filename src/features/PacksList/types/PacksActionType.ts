import {
  filterPacksWithOwnerSwitcherAC,
  setPacksAC,
  updateQueryParamsAC,
} from 'features/PacksList/actions';

export type PacksActionType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof updateQueryParamsAC>
  | ReturnType<typeof filterPacksWithOwnerSwitcherAC>;
