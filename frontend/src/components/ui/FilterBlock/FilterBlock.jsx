import { useState, useEffect } from "react";
import s from "./FilterBlock.module.css";

function FilterBlock({ onFilterChange }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    includeDiscount: false,
    sortType: "default",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <section>
      <div className={s.filter_section}>
        <div className={s.filter_item}>
          <span>Price</span>
          <input
            type="number"
            name="minPrice"
            placeholder="from"
            className={s.input}
            value={filters.minPrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="to"
            className={s.input}
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className={s.filter_item}>
          <span>Discounted items</span>
          <input
            type="checkbox"
            name="includeDiscount"
            className={s.checkbox}
            checked={filters.includeDiscount}
            onChange={handleChange}
          />
        </div>

        <div className={s.filter_item}>
          <span>Sorted</span>
          <select
            name="sortType"
            className={s.select}
            value={filters.sortType}
            onChange={handleChange}
          >
            <option value="default">by default</option>
            <option value="newest">newest</option>
            <option value="price-high">price: high-low</option>
            <option value="price-low">price: low-high</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default FilterBlock;
