import { takeLatest, delay, put } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { requestUserSuccess, requestUserFailure } from '../actions/userActions';

interface FetchUserActionType {
  type: String;
  payload: {
    username: string;
    password: string;
  };
}

function* fetchUserAsync(action: FetchUserActionType) {
  try {
    const {
      payload: { username, password },
    } = action;

    console.log({ username, password });

    // Do api call here

    yield put(requestUserSuccess());
  } catch (error) {
    console.log(error);
    yield put(requestUserFailure());
  }
}

export function* logout() {
  try {
    yield delay(1000); // This is to save multiple requests as saga offers debounce functionality out of the box

    // To understand debounce functionality Hit logout button multiple times withing 1 second and this console will be only printed once
    console.log('Logout Request');
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(actionTypes.USER_REQUEST, fetchUserAsync),
  takeLatest(actionTypes.LOGOUT, logout),
];
