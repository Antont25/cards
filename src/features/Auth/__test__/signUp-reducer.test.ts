import { ActionsSignUp } from 'features/Auth/enums';
import { signUpReducer } from 'features/Auth/reducer/signUpReducer';
import { SignUpStateType } from 'features/Auth/types';

let state = {} as SignUpStateType;

beforeEach(() => {
  state = {
    isSignUp: false,
  };
});

test('SignUp status should be correct', () => {
  const newState = signUpReducer(state, {
    type: ActionsSignUp.SET_IS_SIGNUP,
    isSignUp: true,
  });

  expect(newState.isSignUp).toBe(true);
  expect(Object.keys(newState).length).toBe(1);
});
