import StoreState from '../utils/StoreTypes';

export const getCurrentUserData = (state: StoreState) => ({
  currentUser: state.userData.currentUser,
  initializingCurrentUser: state.userData.initializingCurrentUser,
});
