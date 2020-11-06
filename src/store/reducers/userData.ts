import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import actionTypes from '../actionTypes';
import { UserDataReducerTypes } from '../../interfaceTypes';
import { isPresent } from '../../utils/helper';

export interface ActionType {
  type: String;
  payload: {
    currentUser: FirebaseAuthTypes.User | null;
    confirmation: FirebaseAuthTypes.ConfirmationResult | null;
  };
}

const initialState: UserDataReducerTypes = {
  initializingCurrentUser: true,
  currentUser: null,
  signinLoading: false,
  confirmation: null,
  otpConfirmLoading: false,
  logoutLoading: false,
};

function userData(state = initialState, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        initializingCurrentUser: false,
        currentUser: payload.currentUser,
        ...(isPresent(payload.currentUser) && { confirmation: null }),
      };
    }

    case actionTypes.SIGNIN_PHONE_NUMBER_REQUEST: {
      return {
        ...state,
        signinLoading: true,
        confirmation: null,
      };
    }
    case actionTypes.SIGNIN_PHONE_NUMBER_SUCCESS: {
      return {
        ...state,
        signinLoading: false,
        confirmation: payload.confirmation,
      };
    }
    case actionTypes.SIGNIN_PHONE_NUMBER_FAILURE: {
      return {
        ...state,
        signinLoading: false,
        confirmation: null,
      };
    }

    case actionTypes.CONFIRM_OTP_REQUEST: {
      return {
        ...state,
        otpConfirmLoading: true,
      };
    }
    case actionTypes.CONFIRM_OTP_SUCCESS:
    case actionTypes.CONFIRM_OTP_FAILURE: {
      return {
        ...state,
        otpConfirmLoading: false,
        confirmation: null,
      };
    }

    case actionTypes.LOGOUT_REQUEST: {
      return {
        ...state,
        logoutLoading: true,
      };
    }
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.LOGOUT_FAILURE: {
      return {
        ...state,
        logoutLoading: false,
      };
    }

    default:
      return state;
  }
}

export default userData;
