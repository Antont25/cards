import React, { ReactElement, useState } from 'react';

import { TableCell, TableSortLabel } from '@mui/material';

import { useAppSelector } from 'common/hooks';
import { selectStatus } from 'common/store';
import { HeadCellType } from 'features/packs-list/components/table-packs/TablePacks';

type HeadCellPropsType = {
  sortCallback?: (queryString: string) => void;
  headCell: HeadCellType;
  width?: string;
};
export const HeadCell = ({
  width,
  headCell,
  sortCallback,
}: HeadCellPropsType): ReactElement => {
  const { sortKey, title, sortable } = headCell;

  const status = useAppSelector(selectStatus);

  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState(false);

  const isLoading = status === 'loading';

  const toggleDirection = (): void => {
    setDirection(!direction);
    if (sortCallback) sortCallback(`${direction ? '0' : '1'}${sortKey}`);
  };
  const onActiveHandle = (): void => {
    setActive(!active);
  };
  const directionString = direction ? 'asc' : 'desc';
  const alignCenter = title === 'Actions' ? 'center' : 'left';

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {sortable ? (
        <TableCell key={sortKey} sx={{ maxWidth: width, textAlign: `${alignCenter}` }}>
          <TableSortLabel
            onClick={toggleDirection}
            onFocus={onActiveHandle}
            onBlur={onActiveHandle}
            active={active}
            direction={directionString}
            disabled={isLoading}
          >
            {title}
          </TableSortLabel>
        </TableCell>
      ) : (
        <TableCell key={sortKey} sx={{ textAlign: `${alignCenter}` }}>
          {title}
        </TableCell>
      )}
    </>
  );
};
