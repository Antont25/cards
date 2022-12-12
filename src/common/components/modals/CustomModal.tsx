import * as React from 'react';
import { ReactElement, ReactNode, useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector } from 'common/hooks';
import { selectStatus } from 'common/store';
import commonStyle from 'common/style/style.module.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px 25px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '35px',
  paddingBottom: '15px',
  borderBottom: '1px solid lightgrey',
};

type CustomModalType = {
  children: ReactNode;
  childrenDiv: ReactNode;
  title: string;
  deleteStyle: boolean;
  isClosed?: boolean;
  setDataOnClose?: () => void;
  onClickSaveHandle: () => void;
};

export const CustomModal = ({
  childrenDiv,
  children,
  isClosed,
  setDataOnClose,
  onClickSaveHandle,
  title,
  deleteStyle,
}: CustomModalType): ReactElement => {
  const matches = useMediaQuery('(min-width:991px)');

  const status = useAppSelector(selectStatus);

  const [open, setOpen] = useState(false);

  const handleOpenClose = (): void => {
    setOpen(!open);
    if (setDataOnClose) setDataOnClose();
  };

  const onSaveClick = (): void => {
    onClickSaveHandle();
  };

  useEffect(() => {
    if (isClosed) {
      handleOpenClose();
    }
  }, [isClosed]);

  return (
    <>
      <Box onClick={handleOpenClose}>{childrenDiv}</Box>
      <Modal open={open} onClose={handleOpenClose}>
        <Box sx={{ ...style, width: `${matches ? '500px' : '300px'}` }}>
          <div style={headerStyle}>
            <h3 style={{ margin: '0px' }}>{title}</h3>
            <IconButton aria-label="delete" onClick={handleOpenClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {children}
          <div className={commonStyle.modalBtnBlock}>
            <Button
              onClick={handleOpenClose}
              variant="outlined"
              className={commonStyle.btnStyle}
            >
              Cancel
            </Button>

            {deleteStyle ? (
              <Button
                color="error"
                variant="contained"
                onClick={onSaveClick}
                disabled={status === 'loading'}
                className={commonStyle.btnStyle}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={onSaveClick}
                disabled={status === 'loading'}
                className={commonStyle.btnStyle}
              >
                Save
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};
