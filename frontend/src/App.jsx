import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import CategoriesProductPage from "./pages/CategoriesProductPage/CategoriesProductPage";
import AllProductsPage from "./pages/AllProductsPage/AllProductsPage";
import CartPage from "./pages/CartPage/CartPage";
import SalePage from "./pages/SalePage/SalePage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ui/ScrollToTop/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:id" element={<CategoriesProductPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
