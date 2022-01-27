import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    category: "",
    pageIsHome: "",
  },
  reducers: {
    searchCategory(state, action) {
      state.category = action.payload;
    },
    setPageIsHome(state, action) {
      state.pageIsHome = action.payload;
    },
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
