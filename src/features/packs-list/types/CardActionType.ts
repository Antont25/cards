import {
  setDateCard,
  setQueryParams,
  updateCardGrade,
} from 'features/packs-list/actions';

export type CardActionType =
  | ReturnType<typeof setQueryParams>
  | ReturnType<typeof setDateCard>
  | ReturnType<typeof updateCardGrade>;
