import { all } from 'redux-saga/effects';

import userAuth from './userData';

const tasks = [...userAuth];

const rootSaga = function* rootSaga() {
  yield all(tasks);
};

export default rootSaga;
