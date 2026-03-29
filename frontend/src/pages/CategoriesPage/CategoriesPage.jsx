import s from "./CategoriesPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/CategoriesSlice/categoriesSlice";
import CategoriesItems from "../../components/layout/CategoriesItems/CategoriesItems";
import Button from "../../components/ui/Button/Button";

function CategoriesPage() {
  const { list, status } = useSelector(({ categories }) => categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading categories...</p>;
  }

  if (status === "error") {
    return <p>Error loading categories.</p>;
  }

  if (list.length === 0 && status === "ready") {
    return <p>No categories found.</p>;
  }

  return (
    <section className="wrapper">
      <div className={s.section_categories}>
        <div className={s.links}>
          <Button variant="Link" styleVariant="outline" to="/">
            Main page
          </Button>
          <p className="line"></p>
          <Button
            variant="Link"
            styleVariant="outline"
            to="/categories"
            style={{ color: "black" }}
          >
            Categories
          </Button>
        </div>
        <h2>Categories</h2>
        <div className="catalog">
          {list.map((category) => (
            <CategoriesItems key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesPage;
