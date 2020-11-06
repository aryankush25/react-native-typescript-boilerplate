import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { takeLatest, put, select } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import {
  signinPhoneNumberSuccess,
  signinPhoneNumberFailure,
  confirmOtpSuccess,
  confirmOtpFailure,
  logoutSuccess,
  logoutFailure,
} from '../actions/userActions';
import { getLoginData } from '../selectors/userSelectors';

interface SigninPhoneNumberActionType {
  type: String;
  payload: {
    phoneNumber: string;
  };
}

interface ConfirmOtpActionType {
  type: String;
  payload: {
    otp: string;
  };
}

function* signinPhoneNumberAsync(action: SigninPhoneNumberActionType) {
  try {
    const {
      payload: { phoneNumber },
    } = action;

    const confirmation: FirebaseAuthTypes.ConfirmationResult | null = yield auth().signInWithPhoneNumber(
      phoneNumber,
    );

    yield put(signinPhoneNumberSuccess(confirmation));
  } catch (error) {
    console.log(error);
    yield put(signinPhoneNumberFailure());
  }
}

function* confirmOptAsync(action: ConfirmOtpActionType) {
  try {
    const {
      payload: { otp },
    } = action;

    const { confirmation } = yield select(getLoginData);

    confirmation && (yield confirmation.confirm(otp));

    yield put(confirmOtpSuccess());
  } catch (error) {
    console.log(error);
    yield put(confirmOtpFailure());
  }
}

export function* logoutAsync() {
  try {
    yield auth().signOut();

    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}

export default [
  takeLatest(actionTypes.SIGNIN_PHONE_NUMBER_REQUEST, signinPhoneNumberAsync),
  takeLatest(actionTypes.CONFIRM_OTP_REQUEST, confirmOptAsync),
  takeLatest(actionTypes.LOGOUT_REQUEST, logoutAsync),
];
