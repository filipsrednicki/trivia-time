import { Dispatch } from "redux";
import { database } from "../firebase";
import { ADD_TRIVIA, REMOVE_TRIVIA, SET_FETCHED_SETS, Trivia, TriviaSet } from "./triviaActionTypes";

export const addTrivia = (trivia: Trivia) => {
  return {
    type: ADD_TRIVIA,
    payload: trivia,
  };
};

export const removeTrivia = (id: string) => {
  return {
    type: REMOVE_TRIVIA,
    payload: id,
  };
};

export const setFetchedTriviaSets = (triviaSets: TriviaSet[]) => {
  return {
    type: SET_FETCHED_SETS,
    payload: triviaSets,
  };
};

interface KeyValuePair {
  key: string;
  value: TriviaSet;
}

export const getStoredSets = () => (
  dispatch: Dispatch
) => {
  database.ref("/triviaSets/").get().then((snapshot) => {
    const result: KeyValuePair = snapshot.val();
    const resultArr: TriviaSet[] = [];
    for (const [key, value] of Object.entries(result)) {
      value.id = key;
      resultArr.push(value);
    }
    dispatch(setFetchedTriviaSets(resultArr));
  })
  .catch(err => {
    console.log(err);
  })
};