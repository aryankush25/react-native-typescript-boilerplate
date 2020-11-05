import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-gesture-handler';
import ReduxStore, { persistor } from '../../store';
import AppContainer from '../AppContainer';
import RootNavigator from '../../RootNavigator';
import SplashScreen from '../../screens/SplashScreen';

function App() {
  return (
    <Provider store={ReduxStore}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <AppContainer>
          <RootNavigator />
        </AppContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
