export interface CurrentUserTypes {
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserDataReducerTypes {
  userData: CurrentUserTypes;
  loginSpinner: boolean;
}
