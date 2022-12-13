import React, { useEffect, useState } from 'react';

import { Slider } from '@mui/material';

import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../../common/hooks/useAppSelector';
import { useDebounce } from '../../../../common/hooks/useDebounce';
import { styleDisabled } from '../Settings';

import styles from './CardsSlider.module.css';

import {
  OwnerSwitcherType,
  updateQueryParamsAC,
} from 'features/packs-list/reducers/packsReducer';

type CardsSliderType = {
  clearFilter: boolean;
  setClearFilter: (value: boolean) => void;
  isLoading?: boolean;
};

export const CardsSlider = (props: CardsSliderType) => {
  const maxCardsCount = useAppSelector(state => state.packs.packs.maxCardsCount);
  const minCardsCount = useAppSelector(state => state.packs.packs.minCardsCount);
  const min = useAppSelector(state => state.packs.queryParams.min);
  const max = useAppSelector(state => state.packs.queryParams.max);
  const ownerSwitcher = useAppSelector(state => state.packs.filters.ownerSwitcher);
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState<number[]>(() => {
    if (min === undefined || max === undefined) {
      return [minCardsCount, maxCardsCount];
    }

    return [min, max];
  });
  const [valueOwnerSwitcher, setValueOwnerSwitcher] =
    useState<OwnerSwitcherType>(ownerSwitcher);
  const [isActiveDebounced, setIsActiveDebounced] = useState(true);

  const debouncedValue = useDebounce<number[]>(value, 500);
  const valuetext = (value: number) => {
    return `${value} cards to show`;
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
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
      } else if (min !== undefined && max !== undefined) {
        setValue([min, max]);
      }
    } else {
      setValue([minCardsCount, maxCardsCount]);
      setValueOwnerSwitcher(ownerSwitcher);
      setIsActiveDebounced(false);
    }
  }, [minCardsCount, maxCardsCount]);

  useEffect(() => {
    setValue([minCardsCount, maxCardsCount]);
    props.setClearFilter(false);
  }, [props.clearFilter]);

  const disabledLabelStyles = props.isLoading ? styleDisabled : {};

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
          getAriaValueText={valuetext}
          disableSwap
          min={minCardsCount}
          max={maxCardsCount}
          style={{ width: '200px' }}
          disabled={props.isLoading}
        />
        <div className={styles.sliderEndValue}>{value[1]}</div>
      </div>
    </div>
  );
};
