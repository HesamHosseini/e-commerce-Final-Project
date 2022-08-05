import { configureStore } from "@reduxjs/toolkit";
import headeerSliceReducer from "./slices/headerSlice";
import categoryFilterSliceReducer from "./slices/categoryFilterSlice";
export const store = configureStore({
  reducer: {
    header: headeerSliceReducer,
    categoryFilter: categoryFilterSliceReducer,
  },
});
