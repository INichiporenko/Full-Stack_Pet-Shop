import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./CategoriesSlice/categoriesSlice";
import saleReducer from "./ProductsSlice/productsSlice";
import productsReducer from "./OrderSlice/orderSlice";
import cartReducer from "./CartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
