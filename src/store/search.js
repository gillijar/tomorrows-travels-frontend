import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearching: false,
    desktopIsSearching: false,
    searchedLocation: [],
    allLocations: [],
    isLoading: false,
    desktopSearchInput: "",
  },
  reducers: {
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    setDesktopIsSearching(state, action) {
      state.desktopIsSearching = action.payload;
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
    setDesktopSearchInput(state, action) {
      state.desktopSearchInput = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
