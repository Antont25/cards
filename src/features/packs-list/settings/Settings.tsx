import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';

import { CardsSlider } from './cards-slider/CardsSlider';
import { DisableFilterButton } from './disable-filter-button/DisableFilterButton';
import { OwnerSwitcher } from './owner-switcher/OwnerSwitcher';
import { Search } from './search/Search';
import styles from './Settings.module.css';

import {
  getPacksTC,
  updateQueryParamsAC,
} from 'features/packs-list/reducers/packsReducer';

export const styleDisabled = {
  opacity: '0.5',
};

export const Settings = () => {
  const valueSearch = useAppSelector(state => state.packs.queryParams.packName);
  const status = useAppSelector(state => state.app.status);
  const dispatch = useAppDispatch();

  const [clearFilter, setClearFilter] = useState<boolean>(false);
  const searchHandler = useCallback((packName: string) => {
    dispatch(updateQueryParamsAC({ packName }));
  }, []);

  const isLoading = status === 'loading';

  return (
    <div className={styles.wrapper}>
      <Search
        id="cardPacksSearch"
        callback={searchHandler}
        valueSearch={valueSearch}
        clearFilter={clearFilter}
        isLoading={isLoading}
      />
      <OwnerSwitcher isLoading={isLoading} />
      <CardsSlider
        clearFilter={clearFilter}
        setClearFilter={setClearFilter}
        isLoading={isLoading}
      />
      <DisableFilterButton setClearFilter={setClearFilter} isLoading={isLoading} />
    </div>
  );
};
