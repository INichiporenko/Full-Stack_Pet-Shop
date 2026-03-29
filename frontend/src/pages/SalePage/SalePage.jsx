import s from "./SalePage.module.css";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaleProducts } from "../../redux/ProductsSlice/productsSlice";
import SaleBannerItem from "../../components/layout/SaleBannerItem/SaleBannerItem";
import Button from "../../components/ui/Button/Button";

function SalePage() {
  const dispatch = useDispatch();
  const { list = [], status } = useSelector((state) => state.sale || {});

  // 1. Стан для фільтрів та сортування
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    sortType: "default",
  });

  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [dispatch]);

  // 2. Функція обробки змін в інпутах
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Логіка фільтрації та сортування
  const filteredList = useMemo(() => {
    let result = [...list];

    // Фільтр за ціною
    if (filters.minPrice !== "") {
      result = result.filter(
        (item) =>
          (item.discont_price || item.price) >= Number(filters.minPrice),
      );
    }
    if (filters.maxPrice !== "") {
      result = result.filter(
        (item) =>
          (item.discont_price || item.price) <= Number(filters.maxPrice),
      );
    }

    // Сортування
    if (filters.sortType === "price-low") {
      result.sort(
        (a, b) => (a.discont_price || a.price) - (b.discont_price || b.price),
      );
    } else if (filters.sortType === "price-high") {
      result.sort(
        (a, b) => (b.discont_price || b.price) - (a.discont_price || a.price),
      );
    } else if (filters.sortType === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [list, filters]);

  return (
    <section className="wrapper">
      <div className={s.section_sale}>
        <div className={s.links}>
          <Button variant="Link" styleVariant="outline" to="/">
            Main page
          </Button>
          <p className="line"></p>
          <Button
            variant="Link"
            styleVariant="outline"
            to="/sale"
            style={{ color: "black" }}
          >
            All sales
          </Button>
        </div>

        <h2 className={s.title}>Discounted items</h2>

        <div className={s.filter_section}>
          <div className={s.filter_item}>
            <span>Price</span>
            <input
              type="number"
              name="minPrice"
              placeholder="from"
              className={s.input}
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="to"
              className={s.input}
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className={s.filter_item}>
            <span>Sorted</span>
            <select
              name="sortType"
              className={s.select}
              value={filters.sortType}
              onChange={handleFilterChange}
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-low">price: low-high</option>
              <option value="price-high">price: high-low</option>
            </select>
          </div>
        </div>

        <div className="catalog">
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>Error loading products</p>}
          {status === "success" &&
            filteredList.map((item) => (
              <SaleBannerItem key={item.id} product={item} />
            ))}

          {status === "success" && filteredList.length === 0 && (
            <p>No products match your filters</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SalePage;
