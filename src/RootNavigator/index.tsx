import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as navigationConstants from '../utils/navigationConstants';
import { isNilOrEmpty } from '../utils/helper';
import { useCurrentUserAuthHook } from './hooks';
import { getCurrentUserData } from '../store/selectors/userSelectors';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Verification from '../screens/Verification';
import OnBoarding from '../screens/OnBoarding';
import Home from '../screens/Home';

const { Navigator, Screen } = createStackNavigator();

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
      <Navigator
        initialRouteName={navigationConstants.LOGIN_SCREEN}
        headerMode="none">
        <Screen name={navigationConstants.LOGIN_SCREEN} component={Login} />

        <Screen
          name={navigationConstants.VERIFICATION_SCREEN}
          component={Verification}
        />
      </Navigator>
    );
  }

  if (
    isNilOrEmpty(currentUser?.displayName) ||
    isNilOrEmpty(currentUser?.email)
  ) {
    return (
      <Navigator
        initialRouteName={navigationConstants.ON_BOARDING_SCREEN}
        headerMode="none">
        <Screen
          name={navigationConstants.ON_BOARDING_SCREEN}
          component={OnBoarding}
        />
      </Navigator>
    );
  }

  return (
    <Navigator initialRouteName={navigationConstants.HOME_SCREEN}>
      <Screen name={navigationConstants.HOME_SCREEN} component={Home} />
    </Navigator>
  );
};

export default RootNavigator;
