import {
  setDateCard,
  setQueryParams,
  updateCardGrade,
} from 'features/PacksList/actions';

export type CardActionType =
  | ReturnType<typeof setQueryParams>
  | ReturnType<typeof setDateCard>
  | ReturnType<typeof updateCardGrade>;
