import React, { ChangeEvent, memo, ReactElement, useEffect, useState } from 'react';

import { useDebounce } from 'common/hooks';
import styles from 'features/PacksList/components/Settings/Search/style/Search.module.css';
import { styleDisabled } from 'features/PacksList/components/Settings/Settings';

type SearchPropsType = {
  id: string;
  valueSearch: string | undefined;
  clearFilter?: boolean;
  callback: (value: string) => void;
  isLoading?: boolean;
};

export const Search = memo(
  ({
    valueSearch,
    isLoading,
    id,
    clearFilter,
    callback,
  }: SearchPropsType): ReactElement => {
    const [value, setValue] = useState<string>(valueSearch || '');

    const debouncedValue = useDebounce<string>(value);

    const disabledLabelStyles = isLoading ? styleDisabled : {};

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      setValue(event.target.value);
    };

    useEffect(() => {
      if (valueSearch !== value) {
        callback(value);
      }
    }, [debouncedValue]);

    useEffect(() => {
      setValue('');
    }, [clearFilter]);

    return (
      <form className={styles.form}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label} style={disabledLabelStyles} htmlFor={id}>
          Search
        </label>
        <input
          placeholder="Provide your text"
          value={value}
          className={styles.input}
          type="text"
          id={id}
          onChange={handleChange}
          disabled={isLoading}
        />
      </form>
    );
  },
);
