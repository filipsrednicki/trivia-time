import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrivia, removeTrivia } from "../../actions/triviaActions";
import { Trivia } from "../../actions/triviaActionTypes";
import { RootStore } from "../../store";

interface Props {
  trivia: Trivia;
}

const CategoryResult: React.FC<Props> = ({ trivia }) => {
  const trivias = useSelector((state: RootStore) => state.trivias);
  const dispatch = useDispatch();

  const addToTriviaSet = (trivia: Trivia) => {
    dispatch(addTrivia(trivia));
  };

  return (
    <div key={trivia.id}>
      <span>Question</span>
      <p>{trivia.question}</p>
      <span>Difficulty: {trivia.difficulty}</span>
      {trivias.find((t) => t.id === trivia.id) ? (
        <button onClick={() => dispatch(removeTrivia(trivia.id))}>Remove</button>
      ) : (
        <button onClick={() => addToTriviaSet(trivia)}>Add</button>
      )}
    </div>
  );
};

export default CategoryResult;
