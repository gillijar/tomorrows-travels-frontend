import { configureStore } from "@reduxjs/toolkit";

import locationSlice from "./location";
import searchSlice from "./search";

const store = configureStore({
  reducer: { location: locationSlice, search: searchSlice },
});

export default store;
