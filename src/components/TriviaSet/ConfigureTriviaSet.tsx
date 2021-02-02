import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CLEAR_TRIVIA, TriviaSet } from "../../actions/triviaActionTypes";
import { database } from "../../firebase";
import { RootStore } from "../../store";
import InputEl from "../InputEl";
import Modal from "../Modal";

const ConfigureTriviaSet: React.FC = () => {
  const [name, setName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [timePerQ, setTimePerQ] = useState(30);
  const [isFiftyFifty, setIsFiftyFifty] = useState(false);
  const [ffPenalty, setFfPenalty] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { trivias, user } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!trivias.trivias.length) return;
    let maxPoints: number = 0;
    trivias.trivias.forEach((t) => {
      switch (t.difficulty) {
        case "easy":
          maxPoints += 200;
          break;
        case "medium":
          maxPoints += 400;
          break;
        case "hard":
          maxPoints += 600;
          break;
      }
    });

    const triviaSet: TriviaSet = {
      name: name,
      id: "",
      public: isPublic,
      timePerQuestion: timePerQ,
      maxPoints: maxPoints,
      creator: user.user?.username,
      date: new Date().toISOString(),
      fiftyFifty: {
        isAllowed: isFiftyFifty,
        penalty: ffPenalty,
      },
      trivias: trivias.trivias,
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
        setShowModal(true);
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    history.push("/create-set/");
  }

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
          <p>Allow 50:50 (2 wrong answers get crossed out)</p>
          <input
            type="checkbox"
            id="clues"
            checked={isFiftyFifty}
            onChange={() => setIsFiftyFifty((c) => !c)}
          />
          <label htmlFor="clues">On</label>
          <div>
            <label htmlFor="clue-penalty">
              Penalty for using 50:50 (in percent){" "}
            </label>
            <input
              type="number"
              id="clue-penalty"
              name="penalty"
              min={0}
              max={50}
              value={ffPenalty}
              disabled={!isFiftyFifty}
              onChange={(e) => setFfPenalty(+e.target.value)}
            />
          </div>
        </div>
        <button>Confirm</button>
      </form>
      <Modal isShown={showModal} closeModal={closeModal} closeButton={true}>
        <div className="submission-success">
          <h2>Submission Successful!</h2>
          <p>You can now find it in Browse tab.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ConfigureTriviaSet;
