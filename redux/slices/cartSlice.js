import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    value: [{ id: 1, name: "shit" }],
  },

  reducers: {
    addToCart: (state, action) => {
      const isAvailable = state.value.find(
        (item) => item.id === action.payload.id
      );
      if (isAvailable) {
        state.value.map((item) => {
          if (item.id === isAvailable.id) {
            return {
              ...isAvailable,
              id: item.id++,
            };
          } else return item;
        });
      }
    },
    setDrowerState: (state, action) => {
      state.value.drowerState = action.payload;
    },
  },
});

export const { setSearchBarInput } = cartSlice.actions;

export default cartSlice.reducer;
