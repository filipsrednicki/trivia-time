import { combineReducers } from "redux";
import triviaReducer from "./triviaReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  trivias: triviaReducer
})

export default rootReducer;