import { setDateCard, setQueryParams } from 'features/PacksList/actions';
import { cardsReducer } from 'features/PacksList/reducers/cardsReducer';
import { CardsStateType, CardType, ResponseGateCardType } from 'features/PacksList/types';

let state: CardsStateType = {} as CardsStateType;

beforeEach(() => {
  state = {
    queryCardParams: {
      cardAnswer: null,
      cardQuestion: null,
      cardsPack_id: null,
      min: null,
      max: null,
      sortCards: null,
      page: null,
      pageCount: null,
    },
    dateCard: {} as ResponseGateCardType,
  };
});

test('Adding queried parameters', () => {
  const newState = cardsReducer(state, setQueryParams({ cardsPack_id: '1232', max: 5 }));

  expect(newState.queryCardParams.cardsPack_id).toBe('1232');
  // eslint-disable-next-line no-magic-numbers
  expect(newState.queryCardParams.max).toBe(5);
  expect(newState.queryCardParams.cardAnswer).toBe(null);
});
test('Adding date Cards', () => {
  const card: CardType = {
    _id: '555',
    type: 'type',
    cardsPack_id: '12334',
    __v: 0,
    created: '23.08.22',
    answer: '2+2',
    more_id: '22',
    user_id: '55',
    updated: '22.08.22',
    comments: 'not',
    rating: 1,
  };

  const responseDateCards: ResponseGateCardType = {
    cards: [card],
    cardsTotalCount: 5,
    page: 2,
    maxGrade: 3,
    minGrade: 1,
    packCreated: 'Pack',
    pageCount: 1,
  };
  const newState = cardsReducer(state, setDateCard(responseDateCards));

  expect(newState.dateCard.cards.length).toBe(1);
  // eslint-disable-next-line no-underscore-dangle
  expect(newState.dateCard.cards[0]._id).toBe('555');
  expect(newState.dateCard.cards[0].type).toBe('type');
  expect(newState.dateCard.cards[0].cardsPack_id).toBe('12334');
  expect(newState.dateCard.cards[0].comments).toBe('not');

  // eslint-disable-next-line no-magic-numbers
  expect(newState.dateCard.cardsTotalCount).toBe(5);
  // eslint-disable-next-line no-magic-numbers
  expect(newState.dateCard.page).toBe(2);
  // eslint-disable-next-line no-magic-numbers
  expect(newState.dateCard.maxGrade).toBe(3);
  expect(newState.dateCard.minGrade).toBe(1);
});
