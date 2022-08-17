import { createSlice } from "@reduxjs/toolkit";

export const loginStatusSlice = createSlice({
  name: "loginStatusSlice",
  initialState: {
    value: {
      logedIn: false,
      userData: {},
    },
  },

  reducers: {
    setUserLoginStatus: (state, action) => {
      state.value.logedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.value.userData = action.payload;
    },
  },
});

export const { setUserData, setUserLoginStatus } = loginStatusSlice.actions;

export default loginStatusSlice.reducer;
