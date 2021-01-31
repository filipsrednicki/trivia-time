import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import { ReactComponent as XIcon } from "../../icons/im-x.svg";
import { removeTrivia } from "../../actions/triviaActions";

interface Props {
  showCustomSet: boolean;
  setShowCustomSet: (b: boolean) => void;
}

const CustomSet: React.FC<Props> = ({ showCustomSet, setShowCustomSet }) => {
  const trivias = useSelector((state: RootStore) => state.trivias);
  const dispatch = useDispatch();
  
  const removeFromTriviaSet = (id: number) => {
    dispatch(removeTrivia(id));
    if (showCustomSet && trivias.length < 2) {
      setShowCustomSet(false);
    }
  };

  return (
    <div className="custom-trivia-set">
      <h2>Questions in your set</h2>
      {trivias.map((trivia) => (
        <div key={trivia.id}>
          <p>
            <span>Category: </span>
            {trivia.category_name}
          </p>
          <p>{trivia.question}</p>
          <span>{trivia.value / 100}/10</span>
          <button onClick={() => removeFromTriviaSet(trivia.id)}>
            <XIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CustomSet;
