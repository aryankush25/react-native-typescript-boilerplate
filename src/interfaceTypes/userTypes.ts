import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface UserDataReducerTypes {
  initializingCurrentUser: boolean;
  currentUser: FirebaseAuthTypes.User | null;
  signinLoading: boolean;
  otpConfirmLoading: boolean;
  isInvalidOtp: boolean;
  updatingProfileLoading: boolean;
  logoutLoading: boolean;
}
