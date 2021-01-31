import { ADD_TRIVIA, REMOVE_TRIVIA, Trivia } from "./triviaActionTypes";

export const addTrivia = (trivia: Trivia) => {
  return {
    type: ADD_TRIVIA,
    payload: trivia,
  };
};

export const removeTrivia = (id: number) => {
  return {
    type: REMOVE_TRIVIA,
    payload: id,
  };
};
