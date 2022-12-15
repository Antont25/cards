import React, { ChangeEvent, FC, ReactNode, useState } from 'react';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import TextField from '@mui/material/TextField';

import style from 'features/PacksList/components/Cards/components/AddEditModalCards/style/edit-add-modal-card.module.css';

import { setAppErrorAC } from 'app/actions';
import { CustomModal } from 'common/components/Modals/CustomModal';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import commonStyle from 'common/style/style.module.css';
import { convertFileToBase64 } from 'common/utils/convert-base64';
import { CreateCardType } from 'features/PacksList/types';

export const EditAddModalCard: FC<EditAddModalCardType> = ({
  img,
  question,
  answer,
  saveCallback,
  title,
  childrenBtn,
}) => {
  const dispatch = useAppDispatch();

  const [valueQuestion, setValueQuestion] = useState(question);
  const [valueAnswer, setValueAnswer] = useState(answer);
  const [errorQuestion, setErrorQuestion] = useState(false);
  const [errorAnswer, setErrorAnswer] = useState(false);
  const [valueSelect, setValueSelect] = useState(question ? 'img' : 'text');
  const [isClosed, setIsClosed] = useState(false);
  const [nameFileImg, setNameFileImg] = useState('');
  const [questionImg, setQuestionImg] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setValueSelect(event.target.value as string);
  };
  const onValueQuestionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.currentTarget;

    setErrorQuestion(false);
    setValueQuestion(value);
  };
  const onValueAnswerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = e.currentTarget;

    setErrorAnswer(false);
    setValueAnswer(value);
  };
  const setDataOnClose = (): void => {
    setValueAnswer(answer);
    setValueQuestion(question);
    setErrorQuestion(false);
    setErrorAnswer(false);
    setIsClosed(false);
    setNameFileImg('');
  };

  const handleSaveClick = async (): Promise<void> => {
    if (!valueQuestion && valueSelect === 'text') {
      return setErrorQuestion(true);
    }
    if (!valueAnswer) {
      return setErrorAnswer(true);
    }
    await saveCallback({
      question: valueQuestion,
      answer: valueAnswer,
      questionImg,
    });
    setDataOnClose();
    setIsClosed(true);
  };

  const uploadHandle = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      // eslint-disable-next-line no-magic-numbers
      if (e.target.files[0].size / 1024 <= 4096) {
        const file = e.target.files[0];

        setNameFileImg(file.name);
        convertFileToBase64(file, file64 => {
          setQuestionImg(file64);
        });
      } else {
        dispatch(setAppErrorAC('Incorrect file size'));
      }
    }
  };

  return (
    <CustomModal
      childrenDiv={childrenBtn}
      title={title}
      setDataOnClose={setDataOnClose}
      onSaveClick={handleSaveClick}
      deleteStyle={false}
      isClosed={isClosed}
    >
      <Box sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        {img ? (
          <img src={img} className={commonStyle.questionImg} alt="questionImg" />
        ) : (
          <>
            <InputLabel id="demo-simple-select-label">
              Choose a question format
            </InputLabel>

            <Select sx={{ mb: 4 }} value={valueSelect} onChange={handleChange}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="img">IMG</MenuItem>
            </Select>
          </>
        )}

        {valueSelect === 'text' ? (
          <TextField
            label="Question"
            variant="standard"
            multiline
            maxRows={7}
            value={valueQuestion}
            onChange={onValueQuestionChange}
            error={errorQuestion}
            helperText={errorQuestion && 'Empty field'}
            className={commonStyle.textFieldModal}
          />
        ) : (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadHandle}
              style={{ display: 'none' }}
            />
            <Box className={style.uploadBlock}>
              <Button className={style.uploadBtn} variant="contained" component="span">
                Upload button
              </Button>
              <span className={style.nameImg}>{nameFileImg}</span>
            </Box>
          </label>
        )}

        <TextField
          label="Answer"
          variant="standard"
          multiline
          maxRows={7}
          value={valueAnswer}
          onChange={onValueAnswerChange}
          error={errorAnswer}
          helperText={errorAnswer && 'Empty field'}
          className={commonStyle.textFieldModal}
        />
      </Box>
    </CustomModal>
  );
};
// type
type EditAddModalCardType = {
  childrenBtn: ReactNode;
  title: string;
  question?: string;
  answer?: string;
  img?: string;
  // eslint-disable-next-line no-empty-pattern
  saveCallback: ({}: CreateCardType) => void;
};
