import { useDispatch } from "react-redux";
import Button from "../../ui/Button/Button";
import s from "./SaleBannerItem.module.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/CartSlice/cartSlice";

function SaleBannerItem({ product }) {
  const dispatch = useDispatch();
  const { title, image, price, discont_price, id } = product;
  const imageUrl = `http://localhost:3333/${image}`;

  const discount = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className={s.card}>
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
        <div className={s.price_block}>
          <span className={s.new_price}>${discont_price}</span>
          <span className={s.old_price}>${price}</span>
        </div>
      </div>
    </div>
  );
}

export default SaleBannerItem;
