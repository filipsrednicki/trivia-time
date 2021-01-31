import React, { useEffect, useState } from "react";
import { Trivia } from "../../actions/triviaActionTypes";
import CategoryResult from "./CategoryResult";

interface CategoriesList {
  id: number;
  title: string;
  clues_count: number;
}

export interface Category {
  id: number;
  name: string;
}

const initialCategory: Category = {
  id: -1,
  name: "",
};

const TriviaCategories: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState<CategoriesList[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>(
    initialCategory
  );
  const [catTrivias, setCatTrivias] = useState<Trivia[]>([]);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    fetch("http://jservice.io/api/categories?offset=" + pageNum + "&count=15")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategoriesList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNum]);

  const onCategoryClick = (id: number) => {
    fetch("http://jservice.io/api/category?id=" + id)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const trivia: Trivia[] = res.clues.filter(
          (clue: Trivia) => clue.invalid_count === null
        );
        console.log(trivia);
        setCatTrivias(trivia);
        setCurrentCategory({
          id: res.id,
          name: res.title,
        });
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
              currentCategory.id === cat.id ? "active-category" : undefined
            }
          >
            {cat.title}
          </div>
        ))}
      </div>
      <hr />
      {catTrivias.length < 1 && <h1>Please, choose a category</h1>}
      <div className="category-trivias">
        {catTrivias.map((trivia) => (
          <CategoryResult
            trivia={trivia}
            currentCategory={currentCategory}
            key={trivia.id}
          />
        ))}
      </div>
    </>
  );
};

export default TriviaCategories;
