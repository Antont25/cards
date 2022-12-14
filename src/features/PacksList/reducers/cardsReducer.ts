import { AxiosError } from 'axios';

import { setAppStatusAC } from 'app/actions';
import { AppThunk, RootState } from 'common/store';
import { handleServerNetworkError } from 'common/utils';
import { setDateCard, updateCardGrade } from 'features/PacksList/actions';
import { apiCards } from 'features/PacksList/api';
import { Cards } from 'features/PacksList/enums';
import {
  CardActionType,
  CardsStateType,
  CardType,
  DataCreateCardType,
  ResponseGateCardType,
  UpdateCardGradeDataType,
  UpdateData,
} from 'features/PacksList/types';

const initState: CardsStateType = {
  queryCardParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: null,
    min: null,
    max: null,
    sortCards: null,
    page: 1,
    pageCount: 10,
  },
  dateCard: {
    cards: [] as unknown as CardType,
  } as unknown as ResponseGateCardType,
};

export const cardsReducer = (
  // eslint-disable-next-line default-param-last
  state = initState,
  action: CardActionType,
): CardsStateType => {
  switch (action.type) {
    case Cards.SET_QUERY_PARAMS:
      return {
        ...state,
        queryCardParams: { ...state.queryCardParams, ...action.params },
      };
    case Cards.SET_DATE_CARD:
      return { ...state, dateCard: action.date };
    case Cards.UPDATE_CARD_GRADE:
      // eslint-disable-next-line no-case-declarations
      const newGrade = action.updatedCard.grade;
      // eslint-disable-next-line no-case-declarations
      const newShots = action.updatedCard.shots;

      return {
        ...state,
        dateCard: {
          ...state.dateCard,
          cards: state.dateCard.cards.map(el =>
            // eslint-disable-next-line no-underscore-dangle
            el._id === action.updatedCard._id
              ? {
                  ...el,
                  grade: newGrade,
                  shots: newShots,
                }
              : el,
          ),
        },
      };
    default:
      return state;
  }
};

// thunk
export const fetchCards = (): AppThunk => async (dispatch, getState: () => RootState) => {
  dispatch(setAppStatusAC('loading'));
  const queryParams = getState().cards.queryCardParams;

  try {
    const res = await apiCards.getCards(queryParams);

    dispatch(setDateCard(res.data));
    dispatch(setAppStatusAC('succeeded'));
  } catch (e) {
    handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
  }
};
export const fetchCreateCard =
  (date: DataCreateCardType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      await apiCards.createCard(date);
      dispatch(fetchCards());
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
export const fetchUpdateCard =
  (date: UpdateData): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      await apiCards.updateCard(date);
      dispatch(fetchCards());
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
export const fetchRemoveCard =
  (idCard: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      await apiCards.removeCard(idCard);
      dispatch(fetchCards());
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
export const updateCardGradeTC =
  (data: UpdateCardGradeDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
      const response = await apiCards.updateCardGrade(data);

      dispatch(updateCardGrade(response.data));
      dispatch(setAppStatusAC('succeeded'));
    } catch (e) {
      handleServerNetworkError(e as Error | AxiosError<{ error: string }>, dispatch);
    }
  };
