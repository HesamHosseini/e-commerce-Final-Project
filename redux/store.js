import { configureStore } from "@reduxjs/toolkit";
import headeerSliceReducer from "./slices/headerSlice";
import categoryFilterSliceReducer from "./slices/categoryFilterSlice";
import loginStatusReducer from "./slices/loginStatusSlice";
export const store = configureStore({
  reducer: {
    header: headeerSliceReducer,
    categoryFilter: categoryFilterSliceReducer,
    loginStatusReducer,
  },
});
