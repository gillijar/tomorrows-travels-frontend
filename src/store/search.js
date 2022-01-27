import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearching: false,
    searchedLocation: [],
    allLocations: [],
    isLoading: false,
  },
  reducers: {
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    setSearchedLocation(state, action) {
      state.searchedLocation = action.payload;
    },
    setAllLocations(state, action) {
      state.allLocations = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
