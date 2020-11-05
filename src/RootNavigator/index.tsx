import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { getUserTokens } from '../store/selectors/userSelectors';
import { isNilOrEmpty } from '../utils/helper';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { username, accessToken, refreshToken } = useSelector(getUserTokens);

  if (
    isNilOrEmpty(username) ||
    isNilOrEmpty(accessToken) ||
    isNilOrEmpty(refreshToken)
  ) {
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
