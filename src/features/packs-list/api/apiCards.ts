import { instance } from 'app/api/app-api';
import {
  DataCreateCardType,
  QueryParamsCardType,
  ResponseGateCardType,
  ResponseUpdateCardType,
  UpdateCardGradeDataType,
  UpdateCardGradeResponseType,
  UpdateData,
} from 'features/packs-list/types';

export const apiCards = {
  getCards(params: QueryParamsCardType) {
    return instance.get<ResponseGateCardType>(`cards/card`, { params });
  },
  createCard(dataCard: DataCreateCardType) {
    return instance.post<ResponseUpdateCardType>('cards/card', { card: dataCard });
  },
  removeCard(idCard: string) {
    return instance.delete<ResponseUpdateCardType>(`cards/card?id=${idCard}`);
  },
  updateCard(data: UpdateData) {
    return instance.put<ResponseGateCardType>('cards/card', { card: data });
  },
  updateCardGrade(data: UpdateCardGradeDataType) {
    return instance.put<UpdateCardGradeResponseType>('cards/grade', data);
  },
};
