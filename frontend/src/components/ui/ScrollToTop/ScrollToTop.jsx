import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // useLocation відстежує зміну поточної адреси (URL)
  const { pathname } = useLocation();

  useEffect(() => {
    // Як тільки pathname змінюється, миттєво прокручуємо вікно вгору
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
