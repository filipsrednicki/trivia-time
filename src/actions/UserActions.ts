import {
  USER_LOADING,
  AUTH_FAIL,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  UserType,
} from "./userActionTypes";
import { Dispatch } from "redux";
import { auth, database } from "../firebase";

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
    payload: errorMsg,
  } as const;
};

export const signUp = (email: string, username: string, password: string) => (
  dispatch: Dispatch
) => { 
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res);
      auth.currentUser?.updateProfile({ displayName: username }).catch((err) => {
        console.log("profile update", err);
      });

      database.ref("/usernames/").push(username, (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("success");
        }
      })
      dispatch(signUpUser({ email: email, username: username }));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};

export const logIn = (email: string, password: string) => (
  dispatch: Dispatch
) => {
  dispatch(userLoading());
  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const username = res.user?.displayName
      dispatch(logInUser({ email: email, username: username}));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};

export const logOut = () => (dispatch: Dispatch) => {
  auth
    .signOut()
    .then(() => {
      dispatch(logOutUser());
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err.message));
    });
};
