import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrivia, removeTrivia } from "../../actions/triviaActions";
import { Trivia } from "../../actions/triviaActionTypes";
import { RootStore } from "../../store";
import { Category } from "./TriviaCategories";

interface Props {
  trivia: Trivia;
  currentCategory: Category;
}

const CategoryResult: React.FC<Props> = ({ trivia, currentCategory }) => {
  const trivias = useSelector((state: RootStore) => state.trivias);
  const dispatch = useDispatch();

  const addToTriviaSet = (trivia: Trivia) => {
    trivia.category_name = currentCategory.name;
    dispatch(addTrivia(trivia));
  };

  return (
    <div key={trivia.id}>
      <span>Question</span>
      <p>{trivia.question}</p>
      <span>Difficulty: {trivia.value / 100}/10</span>
      {trivias.find((t) => t.id === trivia.id) ? (
        <button onClick={() => dispatch(removeTrivia(trivia.id))}>Remove</button>
      ) : (
        <button onClick={() => addToTriviaSet(trivia)}>Add</button>
      )}
    </div>
  );
};

export default CategoryResult;
