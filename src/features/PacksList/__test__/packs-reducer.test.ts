import { updateQueryParamsAC } from 'features/PacksList/actions';
import { packsReducer } from 'features/PacksList/reducers/packsReducer';
import {
  PacksFiltersType,
  PacksGetParamsType,
  PacksReducerInitStateType,
} from 'features/PacksList/types';

let startState: PacksReducerInitStateType;

beforeEach(() => {
  startState = {
    packs: {
      cardPacks: [],
      cardPacksTotalCount: 0,
      maxCardsCount: 10,
      minCardsCount: 0,
      page: 0,
      pageCount: 10,
    },
    queryParams: {
      packName: undefined,
      min: 0,
      max: 110,
      sortPacks: undefined,
      page: 0,
      pageCount: 10,
      user_id: undefined,
    },
    filters: {} as PacksFiltersType,
  };
});

test('updateQueryParamsAC should work correctly', () => {
  const data = {
    packName: 'Cards for people',
    min: 0,
    max: 110,
    sortPacks: undefined,
    page: 1,
    pageCount: 10,
    user_id: undefined,
  } as PacksGetParamsType;

  const result = packsReducer(startState, updateQueryParamsAC(data));

  expect(result.queryParams.packName).toBe('Cards for people');
  expect(startState.queryParams.packName).toBe(undefined);

  const oldPacks = startState.packs;
  const newPacks = result.packs;

  expect(oldPacks).toStrictEqual(newPacks);
});
