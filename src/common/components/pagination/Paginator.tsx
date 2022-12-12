import React, { ReactElement } from 'react';

import { Pagination, Stack } from '@mui/material';
import Box from '@mui/material/Box';

import { useAppSelector } from 'common/hooks';

const widthWindow = 991;
const maxTotalCount = 10;

type PaginatorPropsType = {
  page: number;
  totalCount: number;
  rowsPerPage: number;
  changePage: (newPage: number) => void;
  changeRowsPerPage: (rowsPerPage: number) => void;
  width: number;
};

export const Paginator = ({
  page,
  rowsPerPage,
  changeRowsPerPage,
  changePage,
  width,
  totalCount,
}: PaginatorPropsType): ReactElement => {
  const status = useAppSelector(state => state.app.status);
  const isLoading = status === 'loading';
  const pageCount = Math.ceil(totalCount / rowsPerPage);
  const adaptiveSize = width < widthWindow ? 'small' : 'large';

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {totalCount > maxTotalCount && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
          maxWidth="md"
        >
          <Stack spacing={1}>
            {pageCount > 1 && (
              <Pagination
                disabled={isLoading}
                sx={{ marginY: 3 }}
                page={page}
                count={pageCount}
                showFirstButton
                showLastButton
                hideNextButton
                hidePrevButton
                onChange={(_, page) => changePage(page)}
                size={adaptiveSize}
              />
            )}
          </Stack>

          <div>
            {width > widthWindow && 'Show'}
            {width > widthWindow && (
              <select
                style={{ marginLeft: 10, marginRight: 10 }}
                value={rowsPerPage}
                onChange={event => changeRowsPerPage(parseInt(event.target.value, 10))}
                name="RowPerPage"
                id="RowPerPageID"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            )}
            {width > widthWindow && ' Rows per page'}
          </div>
        </Box>
      )}
    </>
  );
};
