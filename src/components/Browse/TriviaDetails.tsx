import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TriviaSet } from "../../actions/triviaActionTypes";
import { RootStore } from "../../store";

const TriviaDetails: React.FC = () => {
  const { fetchedSets } = useSelector((state: RootStore) => state.trivias);
  const params = useParams<{ id: string }>();
  const [triviaSet, setTriviaSet] = useState<TriviaSet>()

  useEffect(() => {
    const chosenSet = fetchedSets.find((t) => t.id === "-" + params.id);
    setTriviaSet(chosenSet)
  }, [fetchedSets, params]);

  return <div>{triviaSet?.name}</div>;
};

export default TriviaDetails;
