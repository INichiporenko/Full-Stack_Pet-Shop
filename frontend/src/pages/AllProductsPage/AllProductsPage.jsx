import { useDispatch, useSelector } from "react-redux";
import s from "./AllProductsPage.module.css";
import { useEffect, useMemo, useState } from "react";
import { fetchAllProducts } from "../../redux/ProductsSlice/productsSlice";
import AllProductsPageItem from "../AllProductsPageItem/AllProductsPageItem";
import Button from "../../components/ui/Button/Button";
import FilterBlock from "../../components/ui/FilterBlock/FilterBlock";

function AllProductsPage() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.sale.list) || [];
  const status = useSelector((state) => state.sale.status);
  const [activeFilters, setActiveFilters] = useState({});

  const filteredItems = useMemo(() => {
    // Якщо дані ще вантажаться або їх немає, повертаємо порожній масив
    if (!allProducts || allProducts.length === 0) return [];

    let result = [...allProducts];

    // Фільтрація за ціною "Від"
    if (activeFilters.minPrice && activeFilters.minPrice !== "") {
      result = result.filter(
        (p) => (p.discont_price || p.price) >= Number(activeFilters.minPrice),
      );
    }
    // Фільтрація за ціною "До"
    if (activeFilters.maxPrice && activeFilters.maxPrice !== "") {
      result = result.filter(
        (p) => (p.discont_price || p.price) <= Number(activeFilters.maxPrice),
      );
    }
    // Тільки товари зі знижкою
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
  }, [allProducts, activeFilters]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

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
          <Button
            variant="Link"
            styleVariant="outline"
            to="/products"
            style={{ color: "black" }}
          >
            All products
          </Button>
        </div>

        <h1 className={s.title}>All products</h1>

        <FilterBlock onFilterChange={setActiveFilters} />

        <div className={s.products_grid}>
          {filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <AllProductsPageItem key={product.id} {...product} />
            ))
          ) : (
            <p>No products found matching your criteria.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProductsPage;
