import React, { useEffect, useState } from "react";
import { Trivia } from "../../actions/triviaActionTypes";
import CategoryResult from "./CategoryResult";
import uuid from "react-uuid";

interface CategoriesList {
  id: number;
  name: string;
}

const TriviaCategories: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState<CategoriesList[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number>(-1);
  const [catTrivias, setCatTrivias] = useState<Trivia[]>([]);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((res) => {
        setCategoriesList(res.trivia_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onCategoryClick = (id: number) => {
    setCurrentCategory(id);
    fetch("https://opentdb.com/api.php?amount=15&category=" + id)
      .then((res) => res.json())
      .then((res) => {
        if (res.response_code === 0) {
          const trivias: Trivia[] = res.results;
          trivias.forEach((t: Trivia) => {
            t.id = uuid();
          });
          setCatTrivias(res.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <hr />
      <div className="categories-list">
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={
              currentCategory === cat.id ? "active-category" : undefined
            }
          >
            {cat.name}
          </div>
        ))}
      </div>
      <hr />
      {catTrivias.length < 1 && <h1>Please, choose a category</h1>}
      <div className="category-trivias">
        {catTrivias.map((trivia) => (
          <CategoryResult trivia={trivia} key={trivia.id} />
        ))}
      </div>
    </>
  );
};

export default TriviaCategories;
