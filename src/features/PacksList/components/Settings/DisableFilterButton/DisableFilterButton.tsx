import React, { ReactElement } from 'react';

import bgImg from 'assets/images/filter.svg';
import { useAppDispatch } from 'common/hooks';
import { filterPacksWithOwnerSwitcherAC } from 'features/PacksList/actions';
import styles from 'features/PacksList/components/Settings/DisableFilterButton/style/DisableFilterButton.module.css';

type DisableFilterType = {
  setClearFilter: (value: boolean) => void;
  isLoading?: boolean;
};

export const DisableFilterButton = ({
  setClearFilter,
  isLoading,
}: DisableFilterType): ReactElement => {
  const dispatch = useAppDispatch();

  const studyBtnClasses = isLoading
    ? `${styles.btn} ${styles.btnDisabled}`
    : `${styles.btn}`;

  const onDisableFilterClick = (): void => {
    dispatch(filterPacksWithOwnerSwitcherAC('all'));
    setClearFilter(true);
  };

  return (
    <div>
      <button
        aria-label="button"
        type="button"
        className={studyBtnClasses}
        onClick={onDisableFilterClick}
        style={{ backgroundImage: `url(${bgImg}` }}
        disabled={isLoading}
      />
    </div>
  );
};
