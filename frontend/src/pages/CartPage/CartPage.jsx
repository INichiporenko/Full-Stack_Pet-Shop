import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  sendOrder,
  clearCart,
} from "../../redux/CartSlice/cartSlice";
import Button from "../../components/ui/Button/Button";
import s from "./CartPage.module.css";
import Modal from "../../components/layout/Modal/Modal";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),

      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.discont_price || item.price,
      })),
    };
    console.log("Sending data:", orderData);
    dispatch(sendOrder(orderData));
    setIsModalOpen(true);
    setIsOrderPlaced(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
  };

  // Рахуємо загальну суму та кількість
  const totalPrice = items.reduce(
    (acc, item) => acc + (item.discont_price || item.price) * item.quantity,
    0,
  );
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section className={`wrapper ${s.cart_section}`}>
      <div className={s.cart_header}>
        <h1>Shopping cart</h1>
        <div className={s.line}></div>
        <Button variant="Link" styleVariant="outline" to="/products">
          Back to the store
        </Button>
      </div>

      <div className={s.cart_content}>
        <div className={s.items_list}>
          {items.length === 0 ? (
            <div className={s.empty_cart}>
              <p>Looks like you have no items in your basket currently.</p>
              <Button
                variant="Link"
                styleVariant="primary"
                className={s.btn_continue}
                to="/products"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={s.cart_item}>
                <img
                  src={`http://localhost:3333/${item.image}`}
                  alt={item.title}
                />
                <div className={s.item_info}>
                  <div className={s.item_top}>
                    <h3>{item.title}</h3>
                    <button
                      className={s.remove_btn}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18"
                          stroke="#282828"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6L18 18"
                          stroke="#282828"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className={s.item_bottom}>
                    <div className={s.counter}>
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className={s.btn_counter}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className={s.btn_counter}
                      >
                        +
                      </button>
                    </div>
                    <div className={s.price_block}>
                      <span className={s.new_price}>
                        ${item.discont_price || item.price}
                      </span>
                      {item.discont_price && (
                        <span className={s.old_price}>${item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={s.order_details}>
            <>
              <div className={s.order_info}>
                <h2>Order details</h2>
                <div className={s.total_block}>
                  <p>{totalItems} items</p>
                  <div className={s.total_count_row}>
                    <p>Total</p>
                    <span className={s.total_price}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <form className={s.order_form} onSubmit={handleOrder}>
                <input type="text" placeholder="Name" required name="name" />
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  name="phone"
                />
                <input type="email" placeholder="Email" required name="email" />
                <Button
                  styleVariant={isOrderPlaced ? "outline" : "primary"}
                  className={s.order_btn}
                  disabled={isOrderPlaced}
                >
                  {isOrderPlaced ? "The Order is Placed" : "Order"}
                </Button>
              </form>
            </>
          </div>
        )}
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </section>
  );
};

export default CartPage;
