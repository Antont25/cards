import React, { ChangeEvent, FC, ReactNode, useState } from 'react';

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

import style from 'features/PacksList/components/Cards/components/AddEditModalCards/style/edit-add-modal-card.module.css';

import { setAppErrorAC } from 'app/actions';
import { CustomModal } from 'common/components/Modals/CustomModal';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import commonStyle from 'common/style/style.module.css';
import { convertFileToBase64 } from 'common/utils/convert-base64';

type AddEditPackModalType = {
  title: string;
  name?: string;
  deckCoverInit?: string;
  childrenDiv: ReactNode;
  saveCallback: (name: string, deckCover: string) => void;
};

export const EditAddModalPack: FC<AddEditPackModalType> = ({
  deckCoverInit,
  name,
  saveCallback,
  title,
  childrenDiv,
}) => {
  const dispatch = useAppDispatch();

  const matches = useMediaQuery('(min-width:991px)');

  const [value, setValue] = useState(name);
  const [deckCover, setDeckCover] = useState(deckCoverInit);
  const [nameFileImg, setNameFileImg] = useState('');
  const [error, setError] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const deckCoverStyle = {
    maxHeight: 150,
    objectFit: 'cover' as 'cover',
  };
  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
  };
  const uploadBtnStyle = {
    margin: '0 auto',
    borderRadius: '24px',
  };

  const onValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.currentTarget;

    if (value.trim() !== '') {
      setError(false);
      setValue(e.currentTarget.value);
    }
  };

  const onIsPrivateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setIsPrivate(e.currentTarget.checked);
  };

  const setDataOnClose = (): void => {
    setValue(name);
    setError(false);
    setIsClosed(false);
  };

  const handleSaveClick = async (): Promise<void> => {
    if (!value) {
      return setError(true);
    }
    await saveCallback(value, deckCover!);
    setDataOnClose();
    setIsClosed(true);
  };

  const uploadHandle = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (e.target.files && e.target.files.length) {
      // eslint-disable-next-line no-magic-numbers
      if (e.target.files[0].size / 1024 <= 4096) {
        const file = e.target.files[0];

        setNameFileImg(file.name);

        convertFileToBase64(file, file64 => {
          setDeckCover(file64);
        });

        return;
      }

      dispatch(setAppErrorAC('Incorrect file size'));
    }
  };

  return (
    <CustomModal
      title={title}
      childrenDiv={childrenDiv}
      setDataOnClose={setDataOnClose}
      onSaveClick={handleSaveClick}
      deleteStyle={false}
      isClosed={isClosed}
    >
      {deckCover && (
        <div style={wrapperStyle}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={deckCover}
            style={{ ...deckCoverStyle, width: `${matches ? '450px' : '250px'}` }}
          />
        </div>
      )}

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <input
          type="file"
          accept="image/*"
          onChange={uploadHandle}
          style={{ display: 'none' }}
        />
        <Box className={style.uploadBlock}>
          <Button
            style={uploadBtnStyle}
            className={style.uploadBtn}
            variant="contained"
            component="span"
          >
            Upload cover
          </Button>
          <span className={style.nameImg}>{nameFileImg}</span>
        </Box>
      </label>

      <TextField
        label="Name pack"
        variant="standard"
        multiline
        maxRows={7}
        value={value}
        onChange={onValueChange}
        error={error}
        helperText={error && 'Empty field'}
        className={commonStyle.textFieldModal}
      />

      <FormGroup style={{ marginBottom: '15px' }}>
        <FormControlLabel
          label="Private pack"
          control={<Checkbox checked={isPrivate} onChange={onIsPrivateChange} />}
        />
      </FormGroup>
    </CustomModal>
  );
};
