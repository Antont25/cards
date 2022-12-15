import React, { ReactElement, useEffect, useState } from 'react';

import { Slider } from '@mui/material';

import { useAppDispatch, useAppSelector, useDebounce } from 'common/hooks';
import {
  selectOwnerSwitcher,
  selectMax,
  selectMaxCardsCount,
  selectMin,
  selectMinCardsCount,
} from 'common/store';
import { updateQueryParamsAC } from 'features/PacksList/actions';
import styles from 'features/PacksList/components/Settings/CardsSlider/style/cards-slider.module.css';
import { styleDisabled } from 'features/PacksList/components/Settings/Settings';
import { OwnerSwitcherType } from 'features/PacksList/types';

type CardsSliderType = {
  clearFilter: boolean;
  setClearFilter: (value: boolean) => void;
  isLoading?: boolean;
};

export const CardsSlider = ({
  setClearFilter,
  clearFilter,
  isLoading,
}: CardsSliderType): ReactElement => {
  const dispatch = useAppDispatch();

  const maxCardsCount = useAppSelector(selectMaxCardsCount);
  const minCardsCount = useAppSelector(selectMinCardsCount);
  const min = useAppSelector(selectMin);
  const max = useAppSelector(selectMax);
  const ownerSwitcher = useAppSelector(selectOwnerSwitcher);

  const [value, setValue] = useState<number[]>(() => {
    if (min === undefined || max === undefined) {
      return [minCardsCount, maxCardsCount];
    }

    return [min, max];
  });
  const [valueOwnerSwitcher, setValueOwnerSwitcher] =
    useState<OwnerSwitcherType>(ownerSwitcher);
  const [isActiveDebounced, setIsActiveDebounced] = useState(true);

  const debouncedValue = useDebounce<number[]>(value);

  const disabledLabelStyles = isLoading ? styleDisabled : {};

  const valueText = (value: number): string => {
    return `${value} cards to show`;
  };

  const handleChange = (event: Event, newValue: number | number[]): void => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    if (value[1] !== 0 && isActiveDebounced) {
      dispatch(updateQueryParamsAC({ min: value[0], max: value[1] }));
    }
    setIsActiveDebounced(true);
  }, [debouncedValue]);

  useEffect(() => {
    if (valueOwnerSwitcher === ownerSwitcher) {
      if (min === undefined && max === undefined) {
        setValue([minCardsCount, maxCardsCount]);
      }

      if (min !== undefined && max !== undefined) {
        setValue([min, max]);
      }

      return;
    }

    setValue([minCardsCount, maxCardsCount]);
    setValueOwnerSwitcher(ownerSwitcher);
    setIsActiveDebounced(false);
  }, [minCardsCount, maxCardsCount]);

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount]);
    setClearFilter(false);
  }, [clearFilter]);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title} style={disabledLabelStyles}>
        Number of cards
      </h4>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderStartValue}>{value[0]}</div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueText}
          disableSwap
          min={minCardsCount}
          max={maxCardsCount}
          style={{ width: '200px' }}
          disabled={isLoading}
        />
        <div className={styles.sliderEndValue}>{value[1]}</div>
      </div>
    </div>
  );
};
