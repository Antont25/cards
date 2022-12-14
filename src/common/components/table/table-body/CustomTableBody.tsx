import React, { memo } from 'react';

import { TableBody } from '@mui/material';

import { TablePacksBody } from 'features/PacksList/components/TablePacks/TablePacksBody';
import { PackType } from 'features/PacksList/types';

type CustomTableBodyPropsType = {
  elements: Array<PackType>;
  myID: string;
  onClickNameHandler: (packId: string) => void;
  width: number;
};
export const CustomTableBody = memo(
  ({ elements, myID, onClickNameHandler, width }: CustomTableBodyPropsType) => {
    return (
      <TableBody>
        {elements.map(el => (
          <TablePacksBody
            /* eslint-disable-next-line no-underscore-dangle */
            key={el._id}
            el={el}
            onClickNameHandler={onClickNameHandler}
            myID={myID}
            width={width}
          />
        ))}
      </TableBody>
    );
  },
);
