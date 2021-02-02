import {
  ADD_TRIVIA,
  REMOVE_TRIVIA,
  CLEAR_TRIVIA,
  SET_FETCHED_SETS,
  Trivia,
  TriviaDispatchTypes,
  TriviaSet,
} from "../actions/triviaActionTypes";

interface TriviaState {
  trivias: Trivia[];
  fetchedSets: TriviaSet[];
}

const defaultState: TriviaState = {
  trivias: [],
  fetchedSets: []
}

const triviaSetReducer = (
  state: TriviaState = defaultState,
  action: TriviaDispatchTypes
) => {
  switch (action.type) {
    case ADD_TRIVIA:
      return {...state, trivias: [...state.trivias, action.payload]};
    case REMOVE_TRIVIA:
      return {...state, trivias: state.trivias.filter(trivia => trivia.id !== action.payload)};
    case CLEAR_TRIVIA:
      return {...state, trivias: []};
    case SET_FETCHED_SETS:
      return {...state, fetchedSets: action.payload };
    default:
      return state;
  }
};

export default triviaSetReducer;
