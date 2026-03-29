import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSingleItem,
} from "../../redux/OrderSlice/orderSlice";
import { addToCart } from "../../redux/CartSlice/cartSlice";
import Button from "../../components/ui/Button/Button";
import s from "./SingleProductPage.module.css";

function SingleProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  const { singleItem, status } = useSelector((state) => state.products);
  const { categoryTitle } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSingleItem());
    };
  }, [dispatch, id]);

  if (status === "loading") return <div className={s.center}>Loading...</div>;
  if (!singleItem) return <div className={s.center}>Product not found</div>;
  if (!singleItem) return null;

  const { title, price, discont_price, description, image, categoryId } =
    singleItem;
  const imageUrl = `http://localhost:3333/${image}`;

  const discount = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  return (
    <section className={`wrapper ${s.product_section}`}>
      <div className={s.links}>
        <Button
          variant="Link"
          styleVariant="outline"
          to="/"
          className={s.btn_block}
        >
          Main page
        </Button>
        <p className={`line ${s.btn_block}`}></p>
        <Button
          variant="Link"
          styleVariant="outline"
          to="/categories"
          className={s.btn_block}
        >
          Categories
        </Button>
        <p className="line"></p>
        <Button
          variant="Link"
          styleVariant="outline"
          to={`/categories/${categoryId}`}
        >
          {categoryTitle}
        </Button>
        <p className="line"></p>
        <Button
          ariant="Link"
          styleVariant="outline"
          to="/"
          style={{ color: "black" }}
        >
          {title}
        </Button>
      </div>

      <div className={s.container}>
        <div className={s.image_block}>
          <img src={imageUrl} alt={title} className={s.main_image} />
        </div>

        <div className={s.info_block}>
          <h2 className={s.desktop_title}>{title}</h2>

          <div className={s.price_wrapper}>
            <span className={s.current_price}>${discont_price || price}</span>
            {discont_price && <span className={s.old_price}>${price}</span>}
            {discount && <span className={s.discount_badge}>-{discount}%</span>}
          </div>

          <div className={s.controls}>
            <div className={s.counter}>
              <button onClick={() => setCount((prev) => Math.max(1, prev - 1))}>
                −
              </button>
              <span>{count}</span>
              <button onClick={() => setCount((prev) => prev + 1)}>+</button>
            </div>

            <Button
              styleVariant="primary"
              className={s.add_to_cart_btn}
              onClick={() => {
                dispatch(addToCart({ ...singleItem, quantity: count }));
              }}
            >
              Add to cart
            </Button>
          </div>

          <div className={s.description}>
            <h3>Description</h3>
            <div className={isExpanded ? s.text_expanded : s.text_collapsed}>
              <p>{description}</p>
            </div>
            <button
              className={s.read_more_btn}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
