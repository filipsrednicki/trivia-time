import {
  ADD_TRIVIA,
  REMOVE_TRIVIA,
  CLEAR_TRIVIA,
  Trivia,
  TriviaDispatchTypes,
} from "../actions/triviaActionTypes";

const defaultState: Trivia[] = [];

const triviaSetReducer = (
  state = defaultState,
  action: TriviaDispatchTypes
) => {
  switch (action.type) {
    case ADD_TRIVIA:
      return [...state, action.payload];
    case REMOVE_TRIVIA:
      return state.filter(trivia => trivia.id !== action.payload);
    case CLEAR_TRIVIA:
      return [];
    default:
      return state;
  }
};

export default triviaSetReducer;
