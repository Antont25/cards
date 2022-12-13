import { PacksFiltersType } from 'features/packs-list/reducers/packsReducer';
import { PacksGetParamsType, PacksType } from 'features/packs-list/types/ApiPacksType';

export type PacksReducerInitStateType = {
  packs: PacksType;
  queryParams: PacksGetParamsType;
  filters: PacksFiltersType;
};
