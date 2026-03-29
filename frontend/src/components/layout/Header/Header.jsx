import s from "./Header.module.css";
import logo from "../../../images/icons/logo.svg";
import cart from "../../../images/icons/cart.svg";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className={`${s.header} ${isScrolled ? s.headerScrolled : ""}`}>
      <div className={`wrapper flex-container ${s.padding}`}>
        <div>
          <Link to="/" className={s.logo}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav className={`${s.nav_menu} ${isMenuOpen ? s.navActive : ""}`}>
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            onClick={handleCloseMenu}
          >
            Main Page
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            onClick={handleCloseMenu}
          >
            Categories
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            onClick={handleCloseMenu}
          >
            All products
          </NavLink>
          <NavLink
            to="/sale"
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            onClick={handleCloseMenu}
          >
            All sales
          </NavLink>
        </nav>

        <div className={s.right_block}>
          <div className={s.cart_wrapper}>
            <NavLink
              to="/cart"
              className={s.cart_link}
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={cart} alt="cart" />
              {totalQuantity > 0 && (
                <span className={s.badge}>{totalQuantity}</span>
              )}
            </NavLink>
          </div>
        </div>

        <button
          className={s.burger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${s.line} ${isMenuOpen ? s.line1Open : ""}`}></span>
          <span className={`${s.line} ${isMenuOpen ? s.line2Open : ""}`}></span>
          <span className={`${s.line} ${isMenuOpen ? s.line3Open : ""}`}></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
