import { Link } from "react-router-dom";
import s from "./CategoriesItems.module.css";

function CategoriesItems({ category }) {
  const image = `http://localhost:3333/${category.image}`;

  return (
    <div className={s.categories_block}>
      <Link to={`/categories/${category.id}`} className={s.link}>
        <div className={s.img_wrapper}>
          <img className={s.image} src={image} alt={category.title} />
        </div>
        <div className={s.title}>{category.title}</div>
      </Link>
    </div>
  );
}

export default CategoriesItems;
