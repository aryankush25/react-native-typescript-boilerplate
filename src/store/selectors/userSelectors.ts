import StoreState from '../utils/StoreTypes';

export const getCurrentUserData = (state: StoreState) => ({
  currentUser: state.userData.currentUser,
  initializingCurrentUser: state.userData.initializingCurrentUser,
});

export const getLoginData = (state: StoreState) => ({
  signinLoading: state.userData.signinLoading,
  otpConfirmLoading: state.userData.otpConfirmLoading,
  isInvalidOtp: state.userData.isInvalidOtp,
});
