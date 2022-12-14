import React, { ReactElement } from 'react';

import { Box, Rating, TableBody, TableCell, TableRow } from '@mui/material';

import deleteImg from 'assets/images/cardPackBtns/delete.svg';
import edit from 'assets/images/cardPackBtns/edit.svg';
import { DeleteModal } from 'common/components/modals/delete-modal/DeleteModal';
import styles from 'common/components/table/style/Table.module.css';
import common from 'common/style/style.module.css';
import { dateConverter, timeConverter } from 'common/utils/date-converter';
import { EditAddModalCard } from 'features/PacksList/components/Cards/components/AddEditModalCards';
import { CardType, CreateCardType } from 'features/PacksList/types';

export const TableCardsBody = ({
  cards,
  deleteCardHandler,
  updateCardHandler,
  isMy,
  isDesktopWidth,
}: TableCardsBodyParams): ReactElement => {
  return (
    <TableBody>
      {cards.map(card => {
        const saveCallback = (params: CreateCardType): void => {
          // eslint-disable-next-line no-underscore-dangle
          updateCardHandler(card._id, params);
        };
        const deleteCallback = (): void => {
          // eslint-disable-next-line no-underscore-dangle
          deleteCardHandler(card._id);
        };

        return (
          <TableRow
            /* eslint-disable-next-line no-underscore-dangle */
            key={card._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" className={common.tableCell}>
              {card.questionImg ? (
                <Box sx={{ maxWidth: '300px' }}>
                  <img
                    src={card.questionImg}
                    alt="questionImg"
                    className={common.questionImg}
                  />
                </Box>
              ) : (
                card.question
              )}
            </TableCell>

            <TableCell align="left" className={common.tableCell}>
              {card.answer}
            </TableCell>

            {isDesktopWidth && (
              <TableCell align="left">
                {dateConverter(card.updated)}
                <br />
                {timeConverter(card.updated)}
              </TableCell>
            )}

            {isDesktopWidth && (
              <TableCell align="right" sx={{ width: '50px' }}>
                <Rating defaultValue={card.grade} precision={0.5} readOnly />
              </TableCell>
            )}
            {isMy && (
              <TableCell align="right">
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', width: '50px' }}
                >
                  <EditAddModalCard
                    title="Edit card"
                    question={card.question}
                    answer={card.answer}
                    img={card.questionImg}
                    childrenBtn={
                      <button
                        aria-label="button"
                        type="button"
                        className={styles.btn}
                        style={{ backgroundImage: `url(${edit})` }}
                      />
                    }
                    saveCallback={saveCallback}
                  />

                  <DeleteModal
                    title="Delete Cards"
                    name={card.question}
                    childrenDiv={
                      <button
                        aria-label="button"
                        type="button"
                        className={styles.btn}
                        style={{ backgroundImage: `url(${deleteImg})` }}
                      />
                    }
                    deleteCallback={deleteCallback}
                  />
                </Box>
              </TableCell>
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
// type
type TableCardsBodyParams = {
  cards: CardType[];
  isMy: boolean;
  updateCardHandler: (id: string, params: CreateCardType) => void;
  deleteCardHandler: (id: string) => void;
  isDesktopWidth: boolean;
};
