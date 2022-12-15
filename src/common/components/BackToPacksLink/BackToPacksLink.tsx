import React, { ReactElement } from 'react';

import { NavLink } from 'react-router-dom';

import styles from 'common/components/BackToPacksLink/style/back-to-packs-link.module.css';
import { RoutePath } from 'common/enums';

export const BackToPacksLink = (): ReactElement => {
  return (
    <NavLink className={styles.packsLink} to={RoutePath.PACK_LIST}>
      Back to Packs List
    </NavLink>
  );
};
