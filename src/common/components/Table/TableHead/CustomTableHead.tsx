import React, { ReactElement } from 'react';

import { TableCell, TableHead, TableRow } from '@mui/material';

import { HeadCell } from './HeadCell';

import { HeadCellType } from 'features/PacksList/components/TablePacks/TablePacks';

export type CustomTableHeadPropsType = {
  headCells: Array<HeadCellType>;
  sortCallback: (queryString: string) => void;
  isMy?: boolean;
  title?: string;
  sortKey?: string;
};

export const CustomTableHead = ({
  sortKey,
  title,
  isMy,
  sortCallback,
  headCells,
}: CustomTableHeadPropsType): ReactElement => {
  return (
    <TableHead style={{ backgroundColor: 'lightgray' }}>
      <TableRow>
        {headCells.map(headCell => (
          <HeadCell
            key={headCell.title}
            sortCallback={sortCallback}
            headCell={headCell}
          />
        ))}
        {isMy && (
          <TableCell sx={{ width: '50px' }} key={sortKey}>
            {title}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
