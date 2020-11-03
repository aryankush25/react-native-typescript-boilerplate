import { combineReducers } from 'redux';
import StoreState from '../utils/StoreTypes';

import userData from './userData';

const allReducers = combineReducers<StoreState>({
  userData,
});

export default allReducers;
