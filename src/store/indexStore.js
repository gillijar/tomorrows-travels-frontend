import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import locationSlice from "./location";
import searchSlice from "./search";

const store = configureStore({
  reducer: { auth: authSlice, location: locationSlice, search: searchSlice },
});

export default store;
