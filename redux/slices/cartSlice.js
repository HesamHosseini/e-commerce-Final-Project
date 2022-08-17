import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    value: [
      {
        id: 1,
        name: "iphone 13 pro max 256 GB Green",
        price: "53000000.00",
        final_price: "53000000.00",
        count: 1,
      },
    ],
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
              count: isAvailable.count++,
            };
          } else return item;
        });
      } else {
        state.value = [...state.value, { ...action.payload, count: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      const isAvailable = state.value.find(
        (item) => item.id === action.payload.id
      );
      if (isAvailable) {
        if (isAvailable.count === 1) {
          state.value = state.value.filter(
            (item) => item.id !== isAvailable.id
          );
        } else {
          state.value.map((item) => {
            if (item.id === isAvailable.id) {
              return {
                ...isAvailable,
                count: isAvailable.count--,
              };
            } else return item;
          });
        }
      }
    },
    deleteFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;

// else {
//  state.value === state.value.filter((item) => item.id !== isAvailable.id);
// }