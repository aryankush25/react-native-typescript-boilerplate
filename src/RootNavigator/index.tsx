import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { getCurrentUserData } from '../store/selectors/userSelectors';
import { isNilOrEmpty } from '../utils/helper';
import { setCurrentUser } from '../store/actions/userDataActions';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { initializingCurrentUser, currentUser } = useSelector(
    getCurrentUserData,
  );

  const onAuthStateChanged = useCallback(
    (currentUserLocal: FirebaseAuthTypes.User | null) => {
      dispatch(setCurrentUser(currentUserLocal));
    },
    [dispatch],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [onAuthStateChanged]);

  if (initializingCurrentUser) {
    return <SplashScreen />;
  }

  if (isNilOrEmpty(currentUser)) {
    return (
      <Stack.Navigator initialRouteName="Login">
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
