import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk } from 'common/store';
import { handleServerNetworkError } from 'common/utils/error-utils';
import { setPacksAC, updateQueryParamsAC } from 'features/packs-list/actions/packsAction';
import { apiPacks } from 'features/packs-list/api';
import { Packs } from 'features/packs-list/enums';
import {
  NewPackType,
  PacksGetParamsType,
  UpdatePackType,
} from 'features/packs-list/types';
import { PacksActionType } from 'features/packs-list/types/PacksActionType';
import { PacksReducerInitStateType } from 'features/packs-list/types/PacksStateType';

export const initState: PacksReducerInitStateType = {
  packs: {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
  },
  queryParams: {
    packName: undefined,
    min: undefined,
    max: undefined,
    sortPacks: undefined,
    page: 1,
    pageCount: 10,
    user_id: undefined,
  },
  filters: {
    ownerSwitcher: 'all',
  },
};

export const packsReducer = (
  // eslint-disable-next-line default-param-last
  state = initState,
  action: PacksActionType,
): PacksReducerInitStateType => {
  switch (action.type) {
    case Packs.SET_PACKS:
      return { ...state, packs: action.packs };
    case Packs.UPDATE_QUERY_PARAMS:
      return { ...state, queryParams: { ...state.queryParams, ...action.params } };
    case Packs.FILTER_OWNER_SWITCHER:
      return { ...state, filters: { ...state.filters, ownerSwitcher: action.filter } };
    default:
      return state;
  }
};
/* ---Thunk---*/
export const getPacksTC =
  (queryParams: PacksGetParamsType): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatusAC('loading'));
      dispatch(updateQueryParamsAC(queryParams));

      const params = getState().packs.queryParams;
      const response = await apiPacks.getPacks(params);

      dispatch(setPacksAC(response));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };

export const addNewPackTC =
  (newPack: NewPackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'));
      await apiPacks.addNewPack(newPack);
      dispatch(getPacksTC({}));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    } finally {
      dispatch(setAppStatusAC('succeeded'));
    }
  };

export const changePackNameTC =
  (updatedPack: UpdatePackType): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'));
      await apiPacks.changePackName(updatedPack);
      dispatch(getPacksTC({}));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    } finally {
      dispatch(setAppStatusAC('succeeded'));
    }
  };

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'));
      await apiPacks.deletePack(id);
      dispatch(getPacksTC({}));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    } finally {
      dispatch(setAppStatusAC('succeeded'));
    }
  };
