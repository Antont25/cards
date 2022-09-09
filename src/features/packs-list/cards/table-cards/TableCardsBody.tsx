import React from 'react';
import {Box, Rating, TableBody, TableCell, TableRow} from '@mui/material';
import common from '../../../../common/style/style.module.css';
import {EditAddModalCard} from '../../modals/add-edit-modal-cards/EditAddModalCard';
import styles from '../../../../common/components/table/Table.module.css';
import edit from '../../../../assets/images/cardPackBtns/edit.svg';
import {DeleteModal} from '../../modals/delete-modal/DeleteModal';
import deleteImg from '../../../../assets/images/cardPackBtns/delete.svg';
import {CardType} from '../cards-api';

type TableCardsBodyParams = {
    cards: CardType[]
    isMy: boolean
    updateCardHandler: (id: string, params: string[]) => void
    deleteCardHandler: (id: string) => void
}

export const TableCardsBody = (props: TableCardsBodyParams) => {
    return (
        <TableBody>
            {props.cards.map((card) => {
                const saveCallback = (params: string[] | string) => {
                    if (Array.isArray(params)) {
                        props.updateCardHandler(card._id, params)
                    }
                }
                const deleteCallback = () => {
                    props.deleteCardHandler(card._id)
                }
                return <TableRow
                    key={card._id}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row"
                               className={common.tableCell}>
                        {card.question}
                    </TableCell>

                    <TableCell align="left"
                               className={common.tableCell}>
                        {card.answer}
                    </TableCell>

                    <TableCell align="left">{card.updated.slice(0, 10)}</TableCell>

                    <TableCell align="right" sx={{width: '50px'}}>
                        <Rating defaultValue={card.grade} precision={0.5} readOnly/>
                    </TableCell>

                    {
                        props.isMy &&
                        <TableCell align="right">

                            <Box sx={{display: 'flex', justifyContent: 'space-between', width: '50px'}}>

                                <EditAddModalCard title={'Edit card'}
                                                  valueQuestion={card.question}
                                                  valueAnswer={card.answer}
                                                  childrenDiv={<button className={styles.btn}
                                                                       style={{backgroundImage: `url(${edit})`}}/>}
                                                  saveCallback={saveCallback}/>

                                <DeleteModal title={'Delete Card'}
                                             name={card.question}
                                             childrenDiv={<button className={styles.btn}
                                                                  style={{backgroundImage: `url(${deleteImg})`}}/>}
                                             deleteCallback={deleteCallback}/>

                            </Box>
                        </TableCell>
                    }
                </TableRow>
            })}
        </TableBody>
    );
};

