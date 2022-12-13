import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'common/components/loading/Loading';
import { Paginator } from 'common/components/pagination/Paginator';
import { CustomTableBody } from 'common/components/table/table-body/CustomTableBody';
import { CustomTableHead } from 'common/components/table/table-head/CustomTableHead';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { GetSortPacksType } from 'features/packs-list/api/apiPacks';
import { setQueryParams } from 'features/packs-list/reducers/cardsReducer';
import { getPacksTC } from 'features/packs-list/reducers/packsReducer';

export type HeadCellType = {
  sortKey: string;
  sortable: boolean;
  title: string;
};
const headCells: Array<HeadCellType> = [
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

export const CardsTable = () => {
  const navigate = useNavigate();
  const cards = useAppSelector(state => state.packs.packs.cardPacks);
  const dispatch = useAppDispatch();
  const myID = useAppSelector(state => state.auth.authData._id);
  const page = useAppSelector(state => state.packs.packs.page);
  const [width, setWidth] = useState(0);

  const cardPacksTotalCount = useAppSelector(
    state => state.packs.packs.cardPacksTotalCount,
  );
  const pageCount = useAppSelector(state => state.packs.packs.pageCount);

  const onClickNameHandler = useCallback(
    (packId: string) => {
      dispatch(setQueryParams({ cardsPack_id: packId }));
      navigate(`/cards/${packId}`);
    },
    [dispatch, navigate],
  );

  const tableHeadCallBack = (queryString: string) => {
    dispatch(getPacksTC({ sortPacks: queryString as GetSortPacksType }));
  };
  const changePage = (newPage: number) => {
    dispatch(getPacksTC({ page: newPage }));
  };
  const changeRowsPerPage = (rowsPerPage: number) => {
    dispatch(getPacksTC({ pageCount: rowsPerPage, page: 1 }));
  };

  const arr: Array<HeadCellType> = useMemo(() => {
    if (width < 576) {
      return headCells.filter(
        column => column.sortKey !== 'user_name' && column.sortKey !== 'updated',
      );
    }
    if (width < 991) {
      return headCells.filter(column => column.sortKey !== 'updated');
    }

    return headCells;
  }, [width]);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  if (!cards.length) {
    return <Loading />;
  }
  console.log(arr);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <CustomTableHead sortCallback={tableHeadCallBack} headCells={arr} />
          <CustomTableBody
            elements={cards}
            myID={myID}
            onClickNameHandler={onClickNameHandler}
            width={width}
          />
        </Table>
      </TableContainer>
      <Paginator
        page={page}
        rowsPerPage={pageCount}
        totalCount={cardPacksTotalCount}
        changePage={changePage}
        changeRowsPerPage={changeRowsPerPage}
        width={width}
      />
    </>
  );
};
