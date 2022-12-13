import { signUpReducer, SignUpStateType } from 'features/auth/reducer/signUpReducer';

let state = {} as SignUpStateType;

beforeEach(() => {
  state = {
    isSignUp: false,
  };
});

test('SignUp status should be correct', () => {
  const newState = signUpReducer(state, {
    type: 'SIGN-UP/SET-IS-SIGNUP',
    isSignUp: true,
  });

  expect(newState.isSignUp).toBe(true);
  expect(Object.keys(newState).length).toBe(1);
});
