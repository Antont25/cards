export { store, rootReducer } from 'common/store/store';
export {
  selectStatus,
  selectInitializeApp,
  selectIsAuth,
  selectName,
  selectAvatar,
  selectEmail,
  selectIsSignUp,
} from 'common/store/selectors';
export type {
  ActionsType,
  RootState,
  AppDispatch,
  AppThunk,
  Nullable,
} from 'common/store/types';
