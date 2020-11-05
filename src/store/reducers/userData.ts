import actionTypes from '../actionTypes';
import { UserDataReducerTypes, CurrentUserTypes } from '../../interfaceTypes';

export interface ActionType {
  type: String;
  payload: CurrentUserTypes;
}

const initialState: UserDataReducerTypes = {
  userData: {
    username: '',
    accessToken: '',
    refreshToken: '',
  },
  loginSpinner: false,
};

function userData(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.USER_REQUEST: {
      return {
        ...state,
        loginSpinner: true,
      };
    }
    case actionTypes.USER_SUCCESS: {
      return {
        ...state,
        userData: payload,
        loginSpinner: false,
      };
    }
    case actionTypes.USER_FAILURE: {
      return {
        ...state,
        loginSpinner: false,
      };
    }
    case actionTypes.RESET_USER_STATE:
      return initialState;

    default:
      return state;
  }
}

export default userData;
