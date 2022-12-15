import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from 'app/reducer/appReducer';
import {
  loadStateMaxCards,
  loadStateMinCards,
  loadStateOwnerSwitcher,
  saveState,
} from 'common/utils/local-utils';
import { authReducer } from 'features/Auth/reducer/authReducer';
import { passwordRecoveryReducer } from 'features/Auth/reducer/passwordRecoveryReducer';
import { signUpReducer } from 'features/Auth/reducer/signUpReducer';
import { cardsReducer } from 'features/PacksList/reducers/cardsReducer';
import { initState, packsReducer } from 'features/PacksList/reducers/packsReducer';

export const rootReducer = combineReducers({
  signUp: signUpReducer,
  app: appReducer,
  auth: authReducer,
  passwordRecovery: passwordRecoveryReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const preloadedState = {
  packs: {
    ...initState,
    queryParams: {
      ...initState.queryParams,
      min: loadStateMinCards(),
      max: loadStateMaxCards(),
    },
    filters: {
      ownerSwitcher: loadStateOwnerSwitcher(),
    },
  },
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk)),
);

store.subscribe(() => {
  saveState({
    queryParams: {
      min: store.getState().packs.queryParams.min,
      max: store.getState().packs.queryParams.max,
    },
    filters: {
      ownerSwitcher: store.getState().packs.filters.ownerSwitcher,
    },
  });
});
