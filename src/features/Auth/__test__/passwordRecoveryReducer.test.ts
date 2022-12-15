import { setEmail } from 'features/Auth/actions';
import { passwordRecoveryReducer } from 'features/Auth/reducer';
import { PasswordRecoveryStateType } from 'features/Auth/types';

let state = {} as PasswordRecoveryStateType;

beforeEach(() => {
  state = {
    email: null,
  };
});

test('Adding an email to which the link was sent', () => {
  const newState = passwordRecoveryReducer(state, setEmail('anton@gmail.com'));

  expect(newState.email).toBe('anton@gmail.com');
  expect(Object.keys(newState).length).toBe(1);
});
