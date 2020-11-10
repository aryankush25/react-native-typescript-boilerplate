import React from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { takeLatest, put, all } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import {
  signinPhoneNumberSuccess,
  signinPhoneNumberFailure,
  confirmOtpSuccess,
  confirmOtpFailure,
  toggleIsInvalidOtp,
  logoutSuccess,
  logoutFailure,
  updateUserProfileSuccess,
  updateUserProfileFailure,
} from '../actions/userDataActions';
import RootNavigation from '../../utils/RootNavigation';
import * as navigationConstants from '../../utils/navigationConstants';
import { isPresent } from '../../utils/helper';

const confirmationRef = React.createRef<FirebaseAuthTypes.ConfirmationResult | null>();

function setConfirmation(
  confirmation: FirebaseAuthTypes.ConfirmationResult | null,
) {
  (confirmationRef as React.MutableRefObject<FirebaseAuthTypes.ConfirmationResult | null>).current = confirmation;
}

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

interface UpdateUserProfileActionType {
  type: String;
  payload: {
    username: string;
    email: string;
  };
}

function* signinPhoneNumberAsync(action: SigninPhoneNumberActionType) {
  try {
    const {
      payload: { phoneNumber },
    } = action;

    const confirmation = yield auth().signInWithPhoneNumber(phoneNumber);

    setConfirmation(confirmation);

    RootNavigation.push(navigationConstants.VERIFICATION_SCREEN, {
      phoneNumber,
    });

    yield put(signinPhoneNumberSuccess());
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

    const confirmation = confirmationRef.current;

    if (isPresent(confirmation)) {
      yield confirmation?.confirm(otp);

      setConfirmation(null);

      yield put(confirmOtpSuccess());
    } else {
      throw new Error('Confirmation object not present');
    }
  } catch (error) {
    if (error.code === 'auth/invalid-verification-code') {
      yield put(toggleIsInvalidOtp());
    } else {
      setConfirmation(null);
      RootNavigation.goBack();
    }

    yield put(confirmOtpFailure());
  }
}

function* updateUserProfileAsync(action: UpdateUserProfileActionType) {
  try {
    const {
      payload: { username },
    } = action;

    yield all([auth().currentUser?.updateProfile({ displayName: username })]);

    yield put(updateUserProfileSuccess());
  } catch (error) {
    yield put(updateUserProfileFailure());
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
  takeLatest(actionTypes.UPDATE_USER_PROFILE_REQUEST, updateUserProfileAsync),
  takeLatest(actionTypes.LOGOUT_REQUEST, logoutAsync),
];
