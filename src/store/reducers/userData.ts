import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import actionTypes from '../actionTypes';
import { UserDataReducerTypes } from '../../interfaceTypes';

export interface ActionType {
  type: String;
  payload: {
    currentUser: FirebaseAuthTypes.User | null;
  };
}

const initialState: UserDataReducerTypes = {
  initializingCurrentUser: true,
  currentUser: null,
  signinLoading: false,
  otpConfirmLoading: false,
  isInvalidOtp: false,
  updatingProfileLoading: false,
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
      };
    }

    case actionTypes.SIGNIN_PHONE_NUMBER_REQUEST: {
      return {
        ...state,
        signinLoading: true,
      };
    }
    case actionTypes.SIGNIN_PHONE_NUMBER_SUCCESS: {
      return {
        ...state,
        signinLoading: false,
      };
    }
    case actionTypes.SIGNIN_PHONE_NUMBER_FAILURE: {
      return {
        ...state,
        signinLoading: false,
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
      };
    }

    case actionTypes.TOGGLE_IS_INVALID_OPT: {
      return {
        ...state,
        isInvalidOtp: !state.isInvalidOtp,
      };
    }

    case actionTypes.UPDATE_USER_PROFILE_REQUEST: {
      return {
        ...state,
        updatingProfileLoading: true,
      };
    }
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_FAILURE: {
      return {
        ...state,
        updatingProfileLoading: false,
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
