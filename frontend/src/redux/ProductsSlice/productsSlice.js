import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSaleProducts = createAsyncThunk(
  "sale/fetchSaleProducts",
  async () => {
    const response = await axios.get("http://localhost:3333/products/all");
    const filteredData = response.data.filter(
      (product) => product.discont_price !== null,
    );
    return {
      data: filteredData,
      title: "Discounted items",
    };
  },
);

export const fetchCategoryProducts = createAsyncThunk(
  "product/fetchByCategory",
  async (id) => {
    const response = await axios.get(`http://localhost:3333/categories/${id}`);
    return {
      data: response.data.data,
      title: response.data.category.title,
    };
  },
);

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAll",
  async () => {
    const response = await axios.get("http://localhost:3333/products/all");
    return {
      data: response.data,
      title: "All products",
    };
  },
);

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    list: [],
    categoryTitle: "",
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обробка All Sales
      .addCase(fetchSaleProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.data;
        state.categoryTitle = action.payload.title;
      })

      // Обробка Categories
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.data;
        state.categoryTitle = action.payload.title;
      })
      .addCase(fetchCategoryProducts.rejected, (state) => {
        state.status = "error";
      })

      // Обробка All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.data;
        state.categoryTitle = action.payload.title;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default saleSlice.reducer;
