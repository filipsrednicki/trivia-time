export const ADD_TRIVIA = "ADD_TRIVIA";
export const REMOVE_TRIVIA = "REMOVE_TRIVIA";
export const CLEAR_TRIVIA = "CLEAR_TRIVIA";

export interface Trivia {
  airdate: string;
  answer: string;
  category_id: number;
  id: number;
  question: string;
  value: number;
  invalid_count: null | number;
  category_name?: string;
}

export interface AddTrivia {
  type: typeof ADD_TRIVIA;
  payload: Trivia;
}

export interface RemoveTrivia {
  type: typeof REMOVE_TRIVIA;
  payload: number;
}

export interface ClearTrivia {
  type: typeof CLEAR_TRIVIA;
}

export type TriviaDispatchTypes = AddTrivia | RemoveTrivia | ClearTrivia;
