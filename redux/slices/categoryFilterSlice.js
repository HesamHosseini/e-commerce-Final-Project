import { createSlice } from "@reduxjs/toolkit";

export const categoryFilterSlice = createSlice({
  name: "categoryFilterSlicee",
  initialState: {
    value: {
      mobileFilterOpen: 0,
      priceOrder: "همه",
      subCategoryfilter: "همه دسته بندی ها",
      discountFilter: "همه محصولات",
      availableProducs: false,
    },
  },

  reducers: {
    setMobileFilterOpen: (state, action) => {
      state.value.mobileFilterOpen = action.payload;
    },
    setPriceOrder: (state, action) => {
      state.value.priceOrder = action.payload;
    },
    setSubCategoryfilter: (state, action) => {
      state.value.subCategoryfilter = action.payload;
    },
    setDiscountFilter: (state, action) => {
      state.value.discountFilter = action.payload;
    },
    toggleAvailableProducs: (state) => {
      state.value.availableProducs = !state.value.availableProducs;
    },
  },
});

export const {
  toggleAvailableProducs,
  setMobileFilterOpen,
  setDiscountFilter,
  setPriceOrder,
  setSubCategoryfilter,
} = categoryFilterSlice.actions;

export default categoryFilterSlice.reducer;
