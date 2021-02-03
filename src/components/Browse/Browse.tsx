import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootStore } from "../../store";

const Browse: React.FC = () => {
  const { fetchedSets } = useSelector((state: RootStore) => state.trivias);
  const history = useHistory();

  const openTrivia = (id: string) => {
    history.push("/trivia-set/" + id.substring(1));
  };

  const calculateRating = (rating: number[]) => {
    if (!rating) {
      return "N/A";
    }
    const ratingSum = rating.reduce((acc, currVal) => acc + currVal);
    const finalRating = ratingSum / rating.length;
    return finalRating;
  };

  const stringToDate = (date: string) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  };

  return (
    <div>
      <ul>
        {fetchedSets.map(
          (set) =>
            set.public && (
              <li key={set.id} onClick={() => openTrivia(set.id)}>
                {set.name} by {set.creator} {stringToDate(set.date)} {calculateRating(set.rating)}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Browse;
