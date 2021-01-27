export const SIGN_UP = "SIGN_UP";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const USER_LOADING = "USER_LOADING";
export const AUTH_FAIL = "AUTH_FAIL";

export type UserType = {
  email: string;
  username: string | undefined | null;
};

export interface AuthLoading {
  type: typeof USER_LOADING;
}

export interface AuthFail {
  type: typeof AUTH_FAIL;
  payload: string;
}

export interface SignUp {
  type: typeof SIGN_UP;
  payload: UserType;
}

export interface LogIn {
  type: typeof LOG_IN;
  payload: UserType;
}

export interface LogOut {
  type: typeof LOG_OUT;
}

export type UserDispatchTypes = AuthLoading | AuthFail | SignUp | LogIn | LogOut;