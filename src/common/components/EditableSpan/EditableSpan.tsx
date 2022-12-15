import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  ChangeEvent,
} from 'react';

import styles from 'common/components/EditableSpan/style/editable-span.module.css';

import { CustomInput } from 'common/components/CustomInput';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type EditableSpanType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  label: string;
  spanProps?: DefaultSpanPropsType;
  value: string;
};

export const EditableSpan: React.FC<EditableSpanType> = ({
  value,
  onChangeText,
  label,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoFocus,
  onBlur,
  onEnter,
  spanProps,

  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState(value);

  const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {};

  const onEnterClick = (): void => {
    setEditMode(false);
    if (onEnter) onEnter();
    // eslint-disable-next-line no-unused-expressions
    if (text) onChangeText && onChangeText(text);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setEditMode(false); // выключить editMode при нажатии за пределами инпута
    if (onBlur) onBlur(e);
    // eslint-disable-next-line no-unused-expressions
    if (text) onChangeText && onChangeText(text);
  };

  const onDoubleClickCallBack = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    setEditMode(true);

    if (onDoubleClick) onDoubleClick(e);
  };

  const spanClassName = `${styles.span} ${className}`;
  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {editMode ? (
        <CustomInput
          label={label}
          value={text}
          autoFocus
          onBlur={onInputBlur}
          onEnter={onEnterClick}
          onChange={onInputChange}
          {...restProps}
        />
      ) : (
        <span
          onDoubleClick={onDoubleClickCallBack}
          className={spanClassName}
          {...restSpanProps}
        >
          {children || value}
        </span>
      )}
    </>
  );
};
