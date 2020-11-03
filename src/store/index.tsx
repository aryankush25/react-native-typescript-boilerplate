import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import logger from 'redux-logger';
import reducers from './reducers';
import rootSaga from './saga';
import StoreState from './utils/StoreTypes';

const persistConfig = {
  key: 'my-react-native-app-redux',
  storage: AsyncStorage,
  whitelist: [''],
};

const persistedReducer = persistReducer<StoreState>(persistConfig, reducers);
const middlewares: any[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const enhancer = applyMiddleware(...middlewares);

const finalCreateStore = compose(enhancer)(createStore);

let store = finalCreateStore(persistedReducer);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
