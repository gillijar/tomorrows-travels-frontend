import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLoggedIn: false,
  },
  reducers: {
    setUserLoggedIn(state, action) {
      state.userLoggedIn = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
