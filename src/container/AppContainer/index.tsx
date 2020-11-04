import React, { ReactNode, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, setIsReadyRef } from '../../utils/RootNavigation';

interface AppContainerTypes {
  children: ReactNode;
}

const AppContainer = ({ children }: AppContainerTypes) => {
  useEffect(() => {
    return () => {
      setIsReadyRef(false);
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setIsReadyRef(true);
      }}>
      {children}
    </NavigationContainer>
  );
};

export default AppContainer;
