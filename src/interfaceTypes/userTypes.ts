import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserDataReducerTypes {
  initializingCurrentUser: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  signinLoading: boolean;
  confirmation: FirebaseAuthTypes.ConfirmationResult | null;
  otpConfirmLoading: boolean;
  logoutLoading: boolean;
}
