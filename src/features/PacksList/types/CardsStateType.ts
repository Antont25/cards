import {
  QueryParamsCardType,
  ResponseGateCardType,
} from 'features/PacksList/types/ApiCardsType';

export type CardsStateType = {
  queryCardParams: QueryParamsCardType;
  dateCard: ResponseGateCardType;
};
