import React, { useEffect } from 'react';

import Button from '@mui/material/Button/Button';

import { useAppDispatch } from '../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../common/hooks/useAppSelector';
import common from '../../common/style/style.module.css';

import { EditAddModalPack } from './components/edit-add-modal-pack/EditAddModalPack';
import { PacksTitle } from './components/packs-title/PacksTitle';
import { Settings } from './settings/Settings';
import { CardsTable } from './components/table-packs/TablePacks';

import { addNewPackTC, getPacksTC } from 'features/packs-list/reducers/packsReducer';
import styles from 'features/packs-list/style/PacksPage.module.css';

export const PacksPage = () => {
  const min = useAppSelector(state => state.packs.queryParams.min);
  const max = useAppSelector(state => state.packs.queryParams.max);
  const myID = useAppSelector(state => state.auth.authData._id);
  const filter = useAppSelector(state => state.packs.filters.ownerSwitcher);
  const packName = useAppSelector(state => state.packs.queryParams.packName);
  const dispatch = useAppDispatch();

  const addNewPack = (name: string, deckCover: string) => {
    dispatch(addNewPackTC({ name, deckCover }));
  };

  useEffect(() => {
    const user_id = filter === 'my' ? myID : undefined;

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
