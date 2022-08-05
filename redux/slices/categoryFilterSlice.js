import { createSlice } from "@reduxjs/toolkit";

export const categoryFilterSlice = createSlice({
  name: "categoryFilterSlice",
  initialState: {
    value: {
      mobileFilterOpen: 0,
    },
  },

  reducers: {
    setMobileFilterOpen: (state, action) => {
      state.value.mobileFilterOpen = action.payload;
    },
  },
});

export const { setMobileFilterOpen } = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
