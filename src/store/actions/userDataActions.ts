import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import actionTypes from '../actionTypes';

export const setCurrentUser = (currentUser: FirebaseAuthTypes.User | null) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { currentUser },
  };
};

export const signinPhoneNumberRequest = (phoneNumber: string) => {
  return {
    type: actionTypes.SIGNIN_PHONE_NUMBER_REQUEST,
    payload: { phoneNumber },
  };
};

export const signinPhoneNumberSuccess = (
  confirmation: FirebaseAuthTypes.ConfirmationResult | null,
) => {
  return {
    type: actionTypes.SIGNIN_PHONE_NUMBER_SUCCESS,
    payload: { confirmation },
  };
};

export const signinPhoneNumberFailure = () => {
  return { type: actionTypes.SIGNIN_PHONE_NUMBER_FAILURE };
};

export const confirmOtpRequest = (otp: string) => {
  return {
    type: actionTypes.CONFIRM_OTP_REQUEST,
    payload: { otp },
  };
};

export const confirmOtpSuccess = () => {
  return {
    type: actionTypes.CONFIRM_OTP_SUCCESS,
  };
};

export const confirmOtpFailure = () => {
  return { type: actionTypes.CONFIRM_OTP_FAILURE };
};

export const logoutRequest = () => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = () => {
  return {
    type: actionTypes.LOGOUT_FAILURE,
  };
};
