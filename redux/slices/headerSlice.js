import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "headerSlice",
  initialState: {
    value: {
      searchBarInput: "",
      drowerState: 0,
    },
  },

  reducers: {
    setSearchBarInput: (state, action) => {
      state.value.searchBarInput = action.payload;
    },
    setDrowerState: (state, action) => {
      state.value.drowerState = action.payload;
    },
  },
});

export const { setSearchBarInput, setDrowerState } = headerSlice.actions;

export default headerSlice.reducer;
