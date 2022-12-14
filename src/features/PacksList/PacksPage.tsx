import React, { ReactElement, useEffect } from 'react';

import Button from '@mui/material/Button/Button';

import { EditAddModalPack } from './components/EditAddModalPack/EditAddModalPack';
import { PacksTitle } from './components/PacksTitle/PacksTitle';
import { Settings } from './components/Settings/Settings';
import { CardsTable } from './components/TablePacks/TablePacks';
import styles from './style/PacksPage.module.css';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import {
  selectMax,
  selectMin,
  selectMyID,
  selectOwnerSwitcher,
  selectValueSearch,
} from 'common/store';
import common from 'common/style/style.module.css';
import { addNewPackTC, getPacksTC } from 'features/PacksList/reducers/packsReducer';

export const PacksPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const min = useAppSelector(selectMin);
  const max = useAppSelector(selectMax);
  const myID = useAppSelector(selectMyID);
  const filter = useAppSelector(selectOwnerSwitcher);
  const packName = useAppSelector(selectValueSearch);

  const addNewPack = (name: string, deckCover: string): void => {
    dispatch(addNewPackTC({ name, deckCover }));
  };

  useEffect(() => {
    // eslint-disable-next-line camelcase
    const user_id = filter === 'my' ? myID : undefined;

    // eslint-disable-next-line camelcase
    dispatch(getPacksTC({ user_id, packName, min, max }));
  }, [packName, filter, min, max]);

  return (
    <div className={styles.wrapper}>
      <PacksTitle title="Packs list">
        <EditAddModalPack
          title="Add new pack"
          saveCallback={addNewPack}
          childrenDiv={
            <Button
              variant="contained"
              className={common.btnStyle}
              sx={{ maxWidth: '200px', mt: '0 !important' }}
            >
              Add new pack
            </Button>
          }
        />
      </PacksTitle>

      <Settings />

      <CardsTable />
    </div>
  );
};
