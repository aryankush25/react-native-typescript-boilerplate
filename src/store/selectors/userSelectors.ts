import StoreState from '../utils/StoreTypes';

export const getUserTokens = (state: StoreState) => ({
  username: state.userData.userData.username,
  accessToken: state.userData.userData.accessToken,
  refreshToken: state.userData.userData.refreshToken,
});
