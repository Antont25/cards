import React, { ReactElement } from 'react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { selectOwnerSwitcher } from 'common/store';
import { filterPacksWithOwnerSwitcherAC } from 'features/PacksList/actions';
import styles from 'features/PacksList/components/Settings/OwnerSwitcher/style/OwnerSwitcher.module.css';
import { styleDisabled } from 'features/PacksList/components/Settings/Settings';
import { OwnerSwitcherType } from 'features/PacksList/types';

type OwnerSwitcherPropsType = {
  isLoading?: boolean;
};

export const OwnerSwitcher = ({ isLoading }: OwnerSwitcherPropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectOwnerSwitcher);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ): void => {
    dispatch(filterPacksWithOwnerSwitcherAC(newAlignment as OwnerSwitcherType));
  };
  const disabledLabelStyles = isLoading ? styleDisabled : {};

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title} style={disabledLabelStyles}>
        Show packs cards
      </h4>
      <ToggleButtonGroup
        size="small"
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton style={{ padding: '5px 40px' }} value="my" disabled={isLoading}>
          My
        </ToggleButton>
        <ToggleButton style={{ padding: '5px 40px' }} value="all" disabled={isLoading}>
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
