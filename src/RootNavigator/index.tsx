import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { isNilOrEmpty } from '../utils/helper';
import { useCurrentUserAuthHook } from './hooks';
import { getCurrentUserData } from '../store/selectors/userSelectors';

const Stack = createStackNavigator();

const RootNavigator = () => {
  useCurrentUserAuthHook();

  const { initializingCurrentUser, currentUser } = useSelector(
    getCurrentUserData,
  );

  if (initializingCurrentUser) {
    return <SplashScreen />;
  }

  if (isNilOrEmpty(currentUser)) {
    return (
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
