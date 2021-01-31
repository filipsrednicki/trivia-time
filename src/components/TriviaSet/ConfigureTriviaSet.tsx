import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_TRIVIA, Trivia } from "../../actions/triviaActionTypes";
import { database } from "../../firebase";
import { RootStore } from "../../store";
import InputEl from "../InputEl";

interface TopPlayer {
  score: number;
  name: string;
}

interface Clues {
  allow: boolean;
  penaltyPerClue: number;
}

export interface TriviaSet {
  name: string;
  public: boolean;
  date: string;
  rating: number[];
  timePerQuestion: number;
  maxPoints: number;
  creator: string | undefined | null;
  clues: Clues;
  leaderboard?: TopPlayer[];
  trivias: Trivia[];
}

const ConfigureTriviaSet: React.FC = () => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [timePerQ, setTimePerQ] = useState(30);
  const [isClue, setIsClue] = useState(false);
  const [cluePenalty, setCluePenalty] = useState(0);
  const { trivias, user } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let maxPoints: number = 0;
    trivias.forEach((t) => {
      maxPoints += t.value;
    });

    const triviaSet: TriviaSet = {
      name: name,
      public: isPublic,
      timePerQuestion: timePerQ,
      clues: {
        allow: isClue,
        penaltyPerClue: cluePenalty,
      },
      creator: user.user?.username,
      date: new Date().toISOString(),
      maxPoints: maxPoints,
      trivias: trivias,
      leaderboard: [],
      rating: [],
    };

    storeTriviaSet(triviaSet);
  };

  const storeTriviaSet = (triviaSet: TriviaSet) => {
    database.ref("/triviaSets/").push(triviaSet, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
        dispatch({ type: CLEAR_TRIVIA });
      }
    });
  };

  return (
    <div className="config-trivia">
      <form onSubmit={handleFormSubmit}>
        <h1>Configure your Trivia Set</h1>
        <InputEl
          id="name"
          label="Trivia set name"
          type="text"
          minLength={3}
          maxLength={12}
          value={name}
          setValue={setName}
        />

        <div>
          <p>Availability of this set</p>
          <input
            id="public"
            type="radio"
            name="sharing"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
          />
          <label htmlFor="public">Public</label>
          <input
            id="private"
            type="radio"
            name="sharing"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
          />
          <label htmlFor="private">Private</label>
        </div>

        <label htmlFor="time-per-question">
          Time per question (in seconds)
        </label>
        <input
          type="number"
          id="time-per-question"
          name="time"
          min={10}
          max={90}
          step={5}
          value={timePerQ}
          onChange={(e) => setTimePerQ(+e.target.value)}
          required
        />

        <div>
          <p>Turn clues on?</p>
          <input
            type="checkbox"
            id="clues"
            checked={isClue}
            onChange={() => setIsClue((c) => !c)}
          />
          <label htmlFor="clues">On</label>
          <div>
            <label htmlFor="clue-penalty">Penalty per clue (in percent) </label>
            <input
              type="number"
              id="clue-penalty"
              name="penalty"
              min={5}
              max={50}
              value={cluePenalty}
              disabled={!isClue}
              onChange={(e) => setCluePenalty(+e.target.value)}
            />
          </div>
        </div>
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default ConfigureTriviaSet;
