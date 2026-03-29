import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3333";

// Екшн для отримання одного товару за ID
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    // API зазвичай повертає масив, де наш товар під індексом 0
    return response.data[0];
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [], // Для загальних списків
    singleItem: null,
    status: "idle", // idle, loading, success, error
    error: null,
  },
  reducers: {
    // Очищення товару при виході зі сторінки (щоб не миготів старий товар)
    clearSingleItem: (state) => {
      state.singleItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "success";
        state.singleItem = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { clearSingleItem } = productsSlice.actions;
export default productsSlice.reducer;
