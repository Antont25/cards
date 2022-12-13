import React from 'react';

import bgImg from '../../../../assets/images/filter.svg';
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';

import styles from './DisableFilterButton.module.css';

import { filterPacksWithOwnerSwitcherAC } from 'features/packs-list/reducers/packsReducer';

type DisableFilterType = {
  setClearFilter: (value: boolean) => void;
  isLoading?: boolean;
};

export const DisableFilterButton = (props: DisableFilterType) => {
  const dispatch = useAppDispatch();

  const onClickDisableFilter = () => {
    dispatch(filterPacksWithOwnerSwitcherAC('all'));
    props.setClearFilter(true);
  };

  const studyBtnClasses = props.isLoading
    ? `${styles.btn} ${styles.btnDisabled}`
    : `${styles.btn}`;

  return (
    <div>
      <button
        className={studyBtnClasses}
        onClick={onClickDisableFilter}
        style={{ backgroundImage: `url(${bgImg}` }}
        disabled={props.isLoading}
      />
    </div>
  );
};
