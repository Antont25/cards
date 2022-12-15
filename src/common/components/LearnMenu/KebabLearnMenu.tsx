import * as React from 'react';
import { ReactElement, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

import deleteImg from 'assets/images/cardPackBtns/delete.svg';
import edit from 'assets/images/cardPackBtns/edit.svg';
import study from 'assets/images/cardPackBtns/study.svg';
import { DeleteModal } from 'common/components/Modals/DeleteModal/DeleteModal';
import styles from 'common/components/Table/style/table.module.css';
import { RoutePath } from 'common/enums';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { Nullable } from 'common/store';
import { EditAddModalPack } from 'features/PacksList/components/EditAddModalPack/EditAddModalPack';
import {
  changePackNameTC,
  deletePackTC,
} from 'features/PacksList/reducers/packsReducer';

type KebabLearnMenuPropsType = {
  packId: Nullable<string> | undefined;
  packName: string;
};

export const KebabLearnMenu = ({
  packId,
  packName,
}: KebabLearnMenuPropsType): ReactElement => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const title = useAppSelector(state =>
    // eslint-disable-next-line no-underscore-dangle
    state.packs.packs.cardPacks.find((pack: any) => pack._id === packId),
  );
  const titleName = title ? title.name : packName;

  const redirectToStudy = (): void => {
    if (packId) {
      return navigate(RoutePath.LEARN + packId);
    }
    setAnchorEl(null);
  };

  const changePackName = (name: string): void => {
    if (packId) {
      dispatch(changePackNameTC({ _id: packId, name }));
    }
    setAnchorEl(null);
  };

  const deletePack = (): void => {
    if (packId) {
      dispatch(deletePackTC(packId));
    }
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginRight: 'auto' }}>
      <IconButton aria-label="more" id="long-button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="long-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            onClick={redirectToStudy}
            className={styles.btn}
            style={{ backgroundImage: `url(${study})`, minHeight: '20px' }}
          />
        </MenuItem>
        <MenuItem>
          <EditAddModalPack
            title="Edit pack"
            name={titleName}
            saveCallback={changePackName}
            childrenDiv={
              // eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type
              <button
                className={styles.btn}
                style={{ backgroundImage: `url(${edit})` }}
              />
            }
          />
        </MenuItem>
        <MenuItem>
          <DeleteModal
            title="Delete Pack"
            name={titleName}
            deleteCallback={deletePack}
            childrenDiv={
              // eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type
              <button
                className={styles.btn}
                style={{ backgroundImage: `url(${deleteImg})` }}
              />
            }
          />
        </MenuItem>
      </Menu>
    </div>
  );
};
