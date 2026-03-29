import { Link } from "react-router-dom";
import s from "./CategoriesBanner.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/CategoriesSlice/categoriesSlice";
import CategoriesItems from "../CategoriesItems/CategoriesItems";
import Button from "../../ui/Button/Button";

function CategoriesBanner() {
  const { list, status } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const firstFourCategories = list.slice(0, 4);

  if (status === "loading") {
    return <p>Loading categories...</p>;
  }

  if (status === "error") {
    return <p>Error loading categories.</p>;
  }

  if (firstFourCategories.length === 0 && status === "ready") {
    return <p>No categories found.</p>;
  }

  return (
    <section className="wrapper">
      <div className={s.section_two}>
        <div className={s.categories}>
          <h2>Categories</h2>
          <div className={s.line}></div>
          <Button variant="Link" styleVariant="outline" to="/categories">
            All categories
          </Button>
        </div>
        <div className="catalog">
          {firstFourCategories.map((category) => (
            <CategoriesItems key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesBanner;
