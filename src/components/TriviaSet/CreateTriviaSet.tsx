import React, { useState } from "react";
import { ReactComponent as ArrowIcon } from "../../icons/im-arrow.svg";
import Modal from "../Modal";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";
import { Link } from "react-router-dom";
import CustomSet from "./CustomSet";
import TriviaCategories from "./TriviaCategories";
import "./_triviaSet.scss";

const CreateTriviaSet: React.FC = () => {
  const [showCustomSet, setShowCustomSet] = useState(false);
  const { trivias } = useSelector((state: RootStore) => state.trivias);

  return (
    <div className="create-set">
      <div
        className="show-set"
        {...(trivias.length > 0 && {
          onClick: () => setShowCustomSet((state) => !state),
        })}
      >
        {trivias.length < 5 ? (
           <span>You need at least {trivias.length > 0 && trivias.length + "/"}5 questions</span>
        ) : (
          <span>{trivias.length} out of 20 max questions</span>
        )}
      </div>
      
      {trivias.length > 4 && (
        <Link className="create-continue" to="/create-set/config">
          <ArrowIcon />
        </Link>
      )}

      <Modal isShown={showCustomSet} closeModal={() => setShowCustomSet(false)}>
        <CustomSet showCustomSet={showCustomSet} setShowCustomSet={setShowCustomSet} />
      </Modal>

      <TriviaCategories/>
    </div>
  );
};

export default CreateTriviaSet;
