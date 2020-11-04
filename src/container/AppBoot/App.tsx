import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import ReduxStore, { persistor } from '../../store';
import AppContainer from '../AppContainer';

function App() {
  return (
    <Provider store={ReduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
