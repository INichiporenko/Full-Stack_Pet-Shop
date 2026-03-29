import s from "./CategoriesProductPageItem.module.css";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice/cartSlice";

function CategoriesProductPageItem({ id, title, image, price, discont_price }) {
  const dispatch = useDispatch();
  const imageUrl = `http://localhost:3333${image}`;

  const discount = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        image,
        price,
        discont_price,
        quantity: 1,
      }),
    );
  };

  return (
    <div className={s.item_card}>
      <div className={s.image_wrapper}>
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt={title} className={s.image} />
        </Link>

        {discount && <span className={s.discount_badge}>-{discount}%</span>}

        <div className={s.hover_btn_container}>
          <Button
            styleVariant="primary"
            className={s.add_btn}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>

      <div className={s.info}>
        <h3 className={s.title}>{title}</h3>
        <div className={s.price_container}>
          {discont_price ? (
            <>
              <span className={s.new_price}>${discont_price}</span>
              <span className={s.old_price}>${price}</span>
            </>
          ) : (
            <span className={s.new_price}>${price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesProductPageItem;
