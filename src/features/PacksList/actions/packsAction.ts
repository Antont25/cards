import { Packs } from 'features/PacksList/enums';
import { PacksGetParamsType, PacksType } from 'features/PacksList/types';
import { OwnerSwitcherType } from 'features/PacksList/types/PacksType';

export const setPacksAC = (packs: PacksType) =>
  ({ type: Packs.SET_PACKS, packs } as const);

export const updateQueryParamsAC = (params: PacksGetParamsType) =>
  ({ type: Packs.UPDATE_QUERY_PARAMS, params } as const);

export const filterPacksWithOwnerSwitcherAC = (filter: OwnerSwitcherType) =>
  ({ type: Packs.FILTER_OWNER_SWITCHER, filter } as const);
