import { configureStore } from "@reduxjs/toolkit";
import headeerSliceReducer from "./slices/headerSlice";

export const store = configureStore({
  reducer: { header : headeerSliceReducer },
});
