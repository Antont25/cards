import React, { ReactElement } from 'react';

import Button from '@mui/material/Button/Button';

import { BackToPacksLink } from 'common/components/back-to-packs-link';
import styles from 'features/pack/style/NewPack.module.css';

export const NewPack = (): ReactElement => {
  const onAddNewCardClick = (): void => {
    alert('see you next week');
  };

  return (
    <div className={styles.wrapper}>
      <BackToPacksLink />
      <h2 className={styles.title}>Name Pack</h2>
      <p className={styles.descr}>
        This pack is empty. Click add new card to fill this pack
      </p>
      <div className={styles.btnWrapper}>
        <Button variant="contained" onClick={onAddNewCardClick}>
          Add new card
        </Button>
      </div>
    </div>
  );
};
