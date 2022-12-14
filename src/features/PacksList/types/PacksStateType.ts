import { PacksGetParamsType, PacksType } from 'features/PacksList/types/ApiPacksType';
import { PacksFiltersType } from 'features/PacksList/types/PacksType';

export type PacksReducerInitStateType = {
  packs: PacksType;
  queryParams: PacksGetParamsType;
  filters: PacksFiltersType;
};
