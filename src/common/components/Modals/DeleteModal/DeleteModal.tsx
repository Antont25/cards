import React, { FC, ReactElement, ReactNode } from 'react';

import { CustomModal } from '../CustomModal';

type DeleteModalType = {
  title: string;
  name?: string;
  childrenDiv: ReactNode;
  deleteCallback: () => void;
};

export const DeleteModal: FC<DeleteModalType> = ({
  deleteCallback,
  name,
  title,
  childrenDiv,
}): ReactElement => {
  return (
    <CustomModal
      title={title}
      childrenDiv={childrenDiv}
      deleteStyle
      onSaveClick={deleteCallback}
    >
      <p style={{ marginBottom: '5px' }}>
        Do you really want to remove <b>{name}</b>?
      </p>
      <p style={{ margin: '0px 0px 25px' }}>All cards will be deleted.</p>
    </CustomModal>
  );
};
