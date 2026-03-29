import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryProducts } from "../../redux/ProductsSlice/productsSlice";
import CategoriesProductPageItem from "../CategoriesProductPageItem/CategoriesProductPageItem";
import s from "./CategoriesProductPage.module.css";
import Button from "../../components/ui/Button/Button";
import FilterBlok from "../../components/ui/FilterBlock/FilterBlock";

function CategoriesProductPage() {
  const { id } = useParams(); // Отримуємо ID категорії з посилання
  const dispatch = useDispatch();

  // Беремо дані зі стору (sale — назва з твого configureStore)
  const { list, categoryTitle, status } = useSelector((state) => state.sale);

  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryProducts(id));
    }
  }, [dispatch, id]);

  const filteredItems = useMemo(() => {
    if (!list || list.length === 0) return [];

    let result = [...list];

    if (activeFilters.minPrice && activeFilters.minPrice !== "") {
      result = result.filter(
        (p) => (p.discont_price || p.price) >= Number(activeFilters.minPrice),
      );
    }
    if (activeFilters.maxPrice && activeFilters.maxPrice !== "") {
      result = result.filter(
        (p) => (p.discont_price || p.price) <= Number(activeFilters.maxPrice),
      );
    }
    if (activeFilters.includeDiscount) {
      result = result.filter((p) => p.discont_price !== null);
    }

    // Сортування
    if (activeFilters.sortType === "price-low") {
      result.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price),
      );
    } else if (activeFilters.sortType === "price-high") {
      result.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price),
      );
    }

    return result;
  }, [list, activeFilters]);

  if (status === "loading")
    return (
      <div className="wrapper">
        <h2>Loading...</h2>
      </div>
    );
  if (status === "error")
    return (
      <div className="wrapper">
        <h2>Error loading products</h2>
      </div>
    );

  return (
    <section className="wrapper">
      <div className={s.section_product}>
        <div className={s.links}>
          <Button variant="Link" styleVariant="outline" to="/">
            Main page
          </Button>
          <p className="line"></p>
          <Button variant="Link" styleVariant="outline" to="/categories">
            Categories
          </Button>
          <p className="line"></p>
          <Button
            ariant="Link"
            styleVariant="outline"
            to="/"
            style={{ color: "black" }}
          >
            {categoryTitle}
          </Button>
        </div>

        <h1 className={s.title}>{categoryTitle}</h1>

        <FilterBlok onFilterChange={setActiveFilters} />

        <div className={s.products_grid}>
          {filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <CategoriesProductPageItem key={product.id} {...product} />
            ))
          ) : (
            <p>No products found in this category matching your filters.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CategoriesProductPage;
