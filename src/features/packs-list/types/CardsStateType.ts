import {
  QueryParamsCardType,
  ResponseGateCardType,
} from 'features/packs-list/types/ApiCardsType';

export type CardsStateType = {
  queryCardParams: QueryParamsCardType;
  dateCard: ResponseGateCardType;
};
