import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./Slices/ProductSlices";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
export default store;
