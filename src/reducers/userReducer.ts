import {
  UserDispatchTypes,
  UserType,
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  USER_LOADING,
  AUTH_FAIL,
} from "../actions/UserActionTypes";

interface UserState {
  loading: boolean;
  errorMsg?: string;
  user?: UserType;
}

const defaultState: UserState = {
  loading: false,
};

const userReducer = (
  state: UserState = defaultState,
  action: UserDispatchTypes
): UserState => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case SIGN_UP:
      return { loading: false, user: action.payload };
    case LOG_IN:
      return { loading: false, user: action.payload };
    case LOG_OUT:
      return { ...state, user: undefined };
    case AUTH_FAIL:
      return { loading: false, errorMsg: action.payload };
    default:
      return state;
  }
};

export default userReducer;
