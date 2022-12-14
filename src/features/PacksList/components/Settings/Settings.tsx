import React, { ReactElement, useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectStatus, selectValueSearch } from 'common/store';
import { updateQueryParamsAC } from 'features/PacksList/actions';
import { CardsSlider } from 'features/PacksList/components/Settings/CardsSlider';
import { DisableFilterButton } from 'features/PacksList/components/Settings/DisableFilterButton';
import { OwnerSwitcher } from 'features/PacksList/components/Settings/OwnerSwitcher';
import { Search } from 'features/PacksList/components/Settings/Search';
import styles from 'features/PacksList/components/Settings/style/Settings.module.css';

export const styleDisabled = {
  opacity: '0.5',
};

export const Settings = (): ReactElement => {
  const dispatch = useAppDispatch();

  const valueSearch = useAppSelector(selectValueSearch);
  const status = useAppSelector(selectStatus);

  const [clearFilter, setClearFilter] = useState<boolean>(false);

  const isLoading = status === 'loading';

  const handleSearch = useCallback((packName: string): void => {
    dispatch(updateQueryParamsAC({ packName }));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search
        id="cardPacksSearch"
        callback={handleSearch}
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
