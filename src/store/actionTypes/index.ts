import { createAsyncActions, createSyncActions } from './helper';
import asyncActions from './asyncActions';
import syncActions from './syncActions';
import { KeyValueType } from '../../interfaceTypes';

const asyncConstants = createAsyncActions(...asyncActions);
const syncConstants = createSyncActions(...syncActions);

const actionsTypes: KeyValueType = {
  ...asyncConstants,
  ...syncConstants,
};

export default actionsTypes;
