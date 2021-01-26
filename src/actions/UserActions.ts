import {
  USER_LOADING,
  AUTH_FAIL,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  UserType,
} from "./userActionTypes";

export const userLoading = () => {
  return {
    type: USER_LOADING,
  } as const;
};

export const signUpUser = (user: UserType) => {
  return {
    type: SIGN_UP,
    payload: user,
  } as const;
};

export const logInUser = (user: UserType) => {
  return {
    type: LOG_IN,
    payload: user,
  } as const;
};

export const logOutUser = () => {
  return {
    type: LOG_OUT,
  } as const;
};

export const authFail = (errorMsg: string) => {
  return {
    type: AUTH_FAIL,
    payload: errorMsg
  } as const;
};