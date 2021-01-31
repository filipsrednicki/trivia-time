export const ADD_TRIVIA = "ADD_TRIVIA";
export const REMOVE_TRIVIA = "REMOVE_TRIVIA";
export const CLEAR_TRIVIA = "CLEAR_TRIVIA";

export interface Trivia {
  category: string;
  correct_answer: string;
  difficulty: string;
  id: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface AddTrivia {
  type: typeof ADD_TRIVIA;
  payload: Trivia;
}

export interface RemoveTrivia {
  type: typeof REMOVE_TRIVIA;
  payload: string;
}

export interface ClearTrivia {
  type: typeof CLEAR_TRIVIA;
}

export type TriviaDispatchTypes = AddTrivia | RemoveTrivia | ClearTrivia;
