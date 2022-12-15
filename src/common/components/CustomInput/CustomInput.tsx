import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';

import styles from 'common/components/CustomInput/style/custom-input.module.css';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  label?: string;
  value: string;
};

export const CustomInput: React.FC<SuperInputTextPropsType> = ({
  value,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...restProps
}) => {
  const finalSpanClassName = `${styles.error} ${spanClassName || ''}`;
  const finalInputClassName = `${error ? styles.error : ''} ${styles.input} ${className}`;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);
    if (onChangeText) onChangeText(e.currentTarget.value);
  };
  const onKeyPressClick = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyPress) onKeyPress(e);
    // eslint-disable-next-line no-unused-expressions
    onEnter && e.key === 'Enter' && onEnter();
  };

  const onSaveClick = (): void => {
    if (onChangeText) onChangeText(value);
  };

  return (
    <div className={styles.fieldOuter}>
      <input
        value={value}
        type="text"
        onChange={onInputChange}
        onKeyPress={onKeyPressClick}
        className={finalInputClassName}
        {...restProps}
      />
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      {error && <span className={finalSpanClassName}>{error}</span>}
      {/* eslint-disable-next-line react/button-has-type */}
      <button className={styles.saveBtn} onClick={onSaveClick}>
        save
      </button>
    </div>
  );
};
