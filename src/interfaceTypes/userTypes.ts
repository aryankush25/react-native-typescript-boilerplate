import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserDataReducerTypes {
  initializingCurrentUser: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  loginSpinner: boolean;
}
