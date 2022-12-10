import { AppActionsType, AppStatusType, InitStateType } from 'app/types';
import { AppActionType } from 'common/enums';

const initState = {
  status: 'idle' as AppStatusType,
  error: null as string | null,
};

// eslint-disable-next-line default-param-last
export const appReducer = (state = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case AppActionType.SET_APP_STATUS:
      return { ...state, status: action.status };
    case AppActionType.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
