import React, { ReactElement, useEffect, useState } from 'react';

import SchoolIcon from '@mui/icons-material/School';
import { Box, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button/Button';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { KebabLearnMenu } from 'common/components/learn-menu/KebabLearnMenu';
import { Paginator } from 'common/components/pagination/Paginator';
import { RoutePath } from 'common/enums';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import {
  selectCardCount,
  selectCardPage,
  selectCards,
  selectCardsPackId,
  selectCardTotalCount,
  selectMyID,
  selectPackName,
  selectPackUserId,
} from 'common/store';
import common from 'common/style/style.module.css';
import { setQueryParams } from 'features/PacksList/actions';
import { EditAddModalCard } from 'features/PacksList/components/Cards/components/AddEditModalCards';
import { TableCards } from 'features/PacksList/components/Cards/components/TableCards';
import { PacksTitle } from 'features/PacksList/components/PacksTitle';
import { Search } from 'features/PacksList/components/Settings/Search';
import {
  fetchCards,
  fetchCreateCard,
  fetchRemoveCard,
  fetchUpdateCard,
} from 'features/PacksList/reducers/cardsReducer';
import { CreateCardType } from 'features/PacksList/types';
import styles from 'features/Profile/style/Profile.module.css';

export const Cards = (): ReactElement => {
  const navigate = useNavigate();
  const params = useParams();

  const dispatch = useAppDispatch();

  const [width, setWidth] = useState(0);

  const page = useAppSelector(selectCardPage);
  const pageCount = useAppSelector(selectCardCount);
  const cardsTotalCount = useAppSelector(selectCardTotalCount);
  const cards = useAppSelector(selectCards);
  const cardsPackId = useAppSelector(selectCardsPackId);
  const packName = useAppSelector(selectPackName);
  const myID = useAppSelector(selectMyID);
  const packUserId = useAppSelector(selectPackUserId);

  const isMy = myID === packUserId;

  const onClickAddCardHandler = async (params: CreateCardType): Promise<void> => {
    if (cardsPackId) {
      await dispatch(fetchCreateCard({ cardsPack_id: cardsPackId, ...params }));
    }
  };

  const changeRowsPerPage = (pageCount: number): void => {
    dispatch(setQueryParams({ pageCount, page: 1 }));
    dispatch(fetchCards());
  };

  const changePage = (page: number): void => {
    dispatch(setQueryParams({ page }));
    dispatch(fetchCards());
  };

  const updateCardHandler = (_id: string, params: CreateCardType): void => {
    dispatch(fetchUpdateCard({ _id, ...params }));
  };

  const deleteCardHandler = (id: string): void => {
    dispatch(fetchRemoveCard(id));
  };

  const searchHandler = (cardQuestion: string): void => {
    dispatch(setQueryParams({ cardQuestion }));
    dispatch(fetchCards());
  };

  const redirectToStudy = (): void => {
    if (cardsPackId) {
      return navigate(RoutePath.LEARN + cardsPackId);
    }
  };

  useEffect(() => {
    if (page > 1) {
      if (cards.length === 0) {
        dispatch(setQueryParams({ page: page - 1 }));
        dispatch(fetchCards());
      }
    }
  }, [cards]);

  useEffect(() => {
    if (!cardsPackId) {
      dispatch(setQueryParams({ cardsPack_id: params.id }));
    }
    dispatch(fetchCards());
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div style={{ paddingBottom: '30px' }}>
      <NavLink className={styles.packsLink} to={RoutePath.PACK_LIST}>
        Back to Packs List
      </NavLink>
      {cards.length > 0 ? (
        <div style={{ position: 'relative' }}>
          <PacksTitle title={packName || ''} packId={cardsPackId} isMy={isMy}>
            {isMy && (
              <>
                {' '}
                <KebabLearnMenu packName={packName || ''} packId={cardsPackId} />
                <EditAddModalCard
                  title="Add new card"
                  saveCallback={onClickAddCardHandler}
                  childrenBtn={
                    <Button
                      variant="contained"
                      className={common.btnStyle}
                      sx={{ maxWidth: '200px', mt: '0 !important' }}
                    >
                      Add new card
                    </Button>
                  }
                />
              </>
            )}
          </PacksTitle>
          {!isMy && (
            <div style={{ position: 'absolute', top: '5px', right: '20px' }}>
              <IconButton onClick={redirectToStudy} size="large">
                <SchoolIcon color="primary" fontSize="large" />
              </IconButton>
            </div>
          )}
          <Box sx={{ mb: 4 }}>
            <Search id="cardPacksSearch" callback={searchHandler} valueSearch="" />
          </Box>
          <TableCards
            cards={cards}
            deleteCardHandler={deleteCardHandler}
            updateCardHandler={updateCardHandler}
          />
          <Paginator
            width={width}
            page={page}
            rowsPerPage={pageCount}
            totalCount={cardsTotalCount}
            changePage={changePage}
            changeRowsPerPage={changeRowsPerPage}
          />
        </div>
      ) : (
        <Box>
          <h2>name pack</h2>
          <Box
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 8 }}
          >
            <Typography sx={{ mb: 4 }}>
              This pack is empty. {isMy && 'Click add new card to fill this Pack'}
            </Typography>
            {isMy && (
              <EditAddModalCard
                title="Add new card"
                saveCallback={onClickAddCardHandler}
                childrenBtn={
                  <Button
                    variant="contained"
                    className={common.btnStyle}
                    sx={{ maxWidth: '200px', mt: '0 !important' }}
                  >
                    Add new card
                  </Button>
                }
              />
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};
