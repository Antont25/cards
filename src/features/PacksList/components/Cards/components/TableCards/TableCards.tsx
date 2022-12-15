import React, { ReactElement } from 'react';

import { TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import useMediaQuery from '@mui/material/useMediaQuery';

import { CustomTableHead } from 'common/components/Table/TableHead/CustomTableHead';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { selectPackUserId, selectMyID } from 'common/store';
import { setQueryParams } from 'features/PacksList/actions';
import { TableCardsBody } from 'features/PacksList/components/Cards/components/TableCards/TableCardsBody';
import { HeadCellType } from 'features/PacksList/components/TablePacks/TablePacks';
import { fetchCards } from 'features/PacksList/reducers/cardsReducer';
import { CardType, CreateCardType, GetSortPacksType } from 'features/PacksList/types';

const headCells: Array<HeadCellType> = [
  {
    sortKey: 'question',
    title: 'Question',
    sortable: true,
  },
  {
    sortKey: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    sortKey: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    sortKey: 'grade',
    title: 'Gradey',
    sortable: true,
  },
];

export const TableCards = ({
  cards,
  deleteCardHandler,
  updateCardHandler,
}: CommonTableType): ReactElement => {
  const dispatch = useAppDispatch();

  const myID = useAppSelector(selectMyID);
  const cardsPackId = useAppSelector(selectPackUserId);

  const isMy = myID === cardsPackId;

  const tableHeadCallBack = (queryString: string): void => {
    dispatch(setQueryParams({ sortCards: queryString as GetSortPacksType }));
    dispatch(fetchCards());
  };

  const matches = useMediaQuery('(min-width:991px)');
  const filteredHeadCells = matches
    ? headCells
    : headCells.filter(cell => cell.title === 'Question' || cell.title === 'Answer');

  return (
    <TableContainer component={Paper}>
      {/* eslint-disable-next-line no-magic-numbers */}
      <Table sx={{ minWidth: `${matches ? 650 : 350}` }} aria-label="simple table">
        <CustomTableHead
          sortCallback={tableHeadCallBack}
          headCells={filteredHeadCells}
          isMy={isMy}
          title="Actions"
          sortKey="actions"
        />
        <TableCardsBody
          cards={cards}
          isMy={isMy}
          updateCardHandler={updateCardHandler}
          deleteCardHandler={deleteCardHandler}
          isDesktopWidth={matches}
        />
      </Table>
    </TableContainer>
  );
};
// type
type CommonTableType = {
  cards: CardType[];
  updateCardHandler: (id: string, params: CreateCardType) => void;
  deleteCardHandler: (id: string) => void;
};
