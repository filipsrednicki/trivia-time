export const ADD_TRIVIA = "ADD_TRIVIA";
export const REMOVE_TRIVIA = "REMOVE_TRIVIA";
export const CLEAR_TRIVIA = "CLEAR_TRIVIA";
export const SET_FETCHED_SETS = "SET_FETCHED_SETS";

export interface Trivia {
  category: string;
  correct_answer: string;
  difficulty: string;
  id: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface TopPlayer {
  score: number;
  name: string;
}

interface FiftyFifty {
  isAllowed: boolean;
  penalty: number;
}

export interface TriviaSet {
  name: string;
  id: string;
  public: boolean;
  date: string;
  rating: number[];
  timePerQuestion: number;
  maxPoints: number;
  creator: string | undefined | null;
  fiftyFifty: FiftyFifty;
  leaderboard?: TopPlayer[];
  trivias: Trivia[];
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

export interface SetFetchedTriviaSets {
  type: typeof SET_FETCHED_SETS;
  payload: TriviaSet[];
}

export type TriviaDispatchTypes = AddTrivia | RemoveTrivia | ClearTrivia | SetFetchedTriviaSets;
