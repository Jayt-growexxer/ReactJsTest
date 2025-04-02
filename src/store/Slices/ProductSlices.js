import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// Async thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await api.get("/products");
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
