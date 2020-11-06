import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { setCurrentUser } from '../store/actions/userDataActions';

export const useCurrentUserAuthHook = () => {
  const dispatch = useDispatch();

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
};
