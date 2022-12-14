import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useNavigate } from 'react-router-dom';

import { Loading } from 'common/components/loading/Loading';
import { Paginator } from 'common/components/pagination/Paginator';
import { CustomTableBody } from 'common/components/table/table-body/CustomTableBody';
import { CustomTableHead } from 'common/components/table/table-head/CustomTableHead';
import { ScreenSize } from 'common/enums';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectCardPacks,
  selectCardPacksTotalCount,
  selectMyID,
  selectPage,
  selectPageCount,
} from 'common/store';
import { setQueryParams } from 'features/PacksList/actions';
import { headCells } from 'features/PacksList/components/TablePacks/config';
import { getPacksTC } from 'features/PacksList/reducers/packsReducer';
import { GetSortPacksType } from 'features/PacksList/types';

export type HeadCellType = {
  sortKey: string;
  sortable: boolean;
  title: string;
};

export const CardsTable = (): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cards = useAppSelector(selectCardPacks);
  const myID = useAppSelector(selectMyID);
  const page = useAppSelector(selectPage);
  const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount);
  const pageCount = useAppSelector(selectPageCount);

  const [width, setWidth] = useState(0);

  const onNameClick = useCallback(
    (packId: string) => {
      dispatch(setQueryParams({ cardsPack_id: packId }));
      navigate(`/cards/${packId}`);
    },
    [dispatch, navigate],
  );

  const tableHeadCallBack = (queryString: string): void => {
    dispatch(getPacksTC({ sortPacks: queryString as GetSortPacksType }));
  };
  const changePage = (newPage: number): void => {
    dispatch(getPacksTC({ page: newPage }));
  };
  const changeRowsPerPage = (rowsPerPage: number): void => {
    dispatch(getPacksTC({ pageCount: rowsPerPage, page: 1 }));
  };

  const arr: Array<HeadCellType> = useMemo(() => {
    if (width < ScreenSize.SM) {
      return headCells.filter(
        column => column.sortKey !== 'user_name' && column.sortKey !== 'updated',
      );
    }
    if (width < ScreenSize.MD) {
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <CustomTableHead sortCallback={tableHeadCallBack} headCells={arr} />
          <CustomTableBody
            elements={cards}
            myID={myID}
            onClickNameHandler={onNameClick}
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
