import { Nullable } from 'common/store';
import { GetSortPacksType } from 'features/PacksList/types/ApiPacksType';

export type UpdateCardGradeDataType = {
  grade: number;
  card_id: string;
};
export type UpdateCardGradeResponseType = {
  _id: string;
  cardsPack_id: string;
  card_id: string;
  user_id: string;
  // eslint-disable-next-line no-magic-numbers
  grade: 3;
  shots: 1;
};
export type DataCreateCardType = CommonDataType & {
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};
export type CreateCardType = {
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
  answer?: string;
  question?: string;
};
type CommonDataType = {
  answer?: string;
  question?: string;
  cardsPack_id: string;
  grade?: number;
  shots?: number;
};
export type CardType = CommonDataType &
  DataCreateCardType & {
    created: string;
    updated: string;
    _id: string;
    user_id: string;
    comments: string;
    type: string;
    rating: number;
    __v: number;
    more_id: string;
  };
export type QueryParamsCardType = {
  cardAnswer?: Nullable<string>;
  cardQuestion?: Nullable<string>;
  cardsPack_id?: Nullable<string>;
  min?: Nullable<number>;
  max?: Nullable<number>;
  sortCards?: null | GetSortPacksType;
  page?: Nullable<number>;
  pageCount?: Nullable<number>;
};
export type ResponseGateCardType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId?: string;
  packName?: string;
  packDeckCover?: string;
  packCreated?: string;
  packUpdated?: string;
  token?: string;
  tokenDeathTime?: number;
  packPrivate?: boolean;
};
export type ResponseUpdateCardType = CardType & {
  token: string;
  tokenDeathTime: number;
};
export type UpdateData = {
  _id: string;
  question?: string;
  answer?: string;
};
