import { HeadCellType } from 'features/PacksList/components/TablePacks/TablePacks';

export const headCells: Array<HeadCellType> = [
  {
    sortKey: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    sortKey: 'cardsCount',
    title: 'Cards',
    sortable: true,
  },
  {
    sortKey: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    sortKey: 'user_name',
    title: 'Created by',
    sortable: true,
  },
  {
    sortKey: 'actions',
    title: 'Actions',
    sortable: false,
  },
];
