import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const isReadyRef = React.createRef<boolean>();
export const navigationRef = React.createRef<NavigationContainerRef>();

export function setIsReadyRef(isReady: boolean) {
  (isReadyRef as React.MutableRefObject<boolean>).current = isReady;
}

//To be used for navigation outside navigation container
function navigate(name: string, params: {}) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  }
}

function push(name: string, params?: object | undefined) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
}

const RootNavigation = { navigate, push };

export default RootNavigation;
