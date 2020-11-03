import { combineReducers } from 'redux';

import userData from './userData';

const allReducers = combineReducers({
  userData,
});

export default allReducers;
