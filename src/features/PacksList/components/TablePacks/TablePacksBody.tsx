import React, { ReactElement } from 'react';

import { TableCell, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import deleteImg from 'assets/images/cardPackBtns/delete.svg';
import edit from 'assets/images/cardPackBtns/edit.svg';
import study from 'assets/images/cardPackBtns/study.svg';
import { DeleteModal } from 'common/components/modals/delete-modal/DeleteModal';
import styles from 'common/components/table/style/Table.module.css';
import { RoutePath, ScreenSize } from 'common/enums';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { dateConverter, timeConverter } from 'common/utils/date-converter';
import { EditAddModalPack } from 'features/PacksList/components/EditAddModalPack/EditAddModalPack';
import { changePackNameTC, deletePackTC } from 'features/PacksList/reducers/packsReducer';
import { PackType } from 'features/PacksList/types';

type CustomTableRowPropsType = {
  el: PackType;
  myID: string;
  onClickNameHandler: (packId: string) => void;
  width: number;
};

export const TablePacksBody = ({
  el,
  myID,
  onClickNameHandler,
  width,
}: CustomTableRowPropsType): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isNoCards = el.cardsCount === 0;
  // eslint-disable-next-line no-underscore-dangle
  const elId = el._id;

  const isScreenSizeMd = width < ScreenSize.MD;

  const redirectToStudy = (): void => {
    return navigate(RoutePath.LEARN + elId);
  };

  const changePackName = (name: string, deckCover: string): void => {
    dispatch(changePackNameTC({ _id: elId, name, deckCover }));
  };

  const deletePack = (): void => {
    dispatch(deletePackTC(elId));
  };

  const studyBtnClasses = isNoCards
    ? `${styles.btn} ${styles.btnDisabled}`
    : `${styles.btn}`;

  const alignAdaptiveRight = isScreenSizeMd ? 'left' : 'right';
  const alignAdaptiveCenter = isScreenSizeMd ? 'center' : 'left';
  const adaptivePadding = isScreenSizeMd ? '10px 0 10px 10px' : '16px';

  return (
    <TableRow key={elId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell
        component="th"
        scope="row"
        onClick={() => onClickNameHandler(elId)}
        style={{
          padding: `${adaptivePadding}`,
          cursor: 'pointer',
          maxWidth: '200px',
          overflowWrap: 'break-word',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}
        >
          {/* eslint-disable-next-line no-magic-numbers */}
          {el.deckCover && el.deckCover.length > 15 && (
            <img
              alt="deckCover"
              src={el.deckCover}
              style={{ width: '60px', height: '40px', objectFit: 'contain' }}
            />
          )}
          {el.name}
        </div>
      </TableCell>
      <TableCell
        align={alignAdaptiveCenter}
        style={{
          padding: `${adaptivePadding}`,
        }}
      >
        {el.cardsCount}
      </TableCell>
      {width > ScreenSize.MD && (
        <TableCell align="left">
          {dateConverter(el.updated)}
          <br />
          {timeConverter(el.updated)}
        </TableCell>
      )}
      {width > ScreenSize.SM && <TableCell align="left">{el.user_name}</TableCell>}
      <TableCell
        align={alignAdaptiveRight}
        style={{
          padding: `${adaptivePadding}`,
        }}
      >
        {myID === el.user_id ? (
          <div className={styles.btnBlock}>
            <button
              type="button"
              aria-label="button"
              onClick={redirectToStudy}
              disabled={isNoCards}
              className={studyBtnClasses}
              style={{ backgroundImage: `url(${study})` }}
            />
            <EditAddModalPack
              title="Edit pack"
              name={el.name}
              deckCoverInit={el.deckCover}
              saveCallback={changePackName}
              childrenDiv={
                <button
                  aria-label="button"
                  type="button"
                  className={styles.btn}
                  style={{ backgroundImage: `url(${edit})` }}
                />
              }
            />
            <DeleteModal
              title="Delete Pack"
              name={el.name}
              deleteCallback={deletePack}
              childrenDiv={
                <button
                  type="button"
                  aria-label="button"
                  className={styles.btn}
                  style={{ backgroundImage: `url(${deleteImg})` }}
                />
              }
            />
          </div>
        ) : (
          <div className={styles.btnBlock}>
            <button
              type="button"
              aria-label="button"
              onClick={redirectToStudy}
              disabled={isNoCards}
              className={studyBtnClasses}
              style={{ backgroundImage: `url(${study})` }}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};
