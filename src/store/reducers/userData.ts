import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import actionTypes from '../actionTypes';
import { UserDataReducerTypes } from '../../interfaceTypes';

export interface ActionType {
  type: String;
  payload: { currentUser?: FirebaseAuthTypes.User | null };
}

const initialState: UserDataReducerTypes = {
  initializingCurrentUser: true,
  currentUser: null,
  loginSpinner: false,
};

function userData(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        initializingCurrentUser: false,
        currentUser: payload.currentUser,
      };
    }
    case actionTypes.USER_REQUEST: {
      return {
        ...state,
        loginSpinner: true,
      };
    }
    case actionTypes.USER_SUCCESS: {
      return {
        ...state,
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
