import { Packs } from 'features/packs-list/enums';
import { PacksGetParamsType, PacksType } from 'features/packs-list/types';
import { OwnerSwitcherType } from 'features/packs-list/types/PacksType';

export const setPacksAC = (packs: PacksType) =>
  ({ type: Packs.SET_PACKS, packs } as const);

export const updateQueryParamsAC = (params: PacksGetParamsType) =>
  ({ type: Packs.UPDATE_QUERY_PARAMS, params } as const);

export const filterPacksWithOwnerSwitcherAC = (filter: OwnerSwitcherType) =>
  ({ type: Packs.FILTER_OWNER_SWITCHER, filter } as const);
