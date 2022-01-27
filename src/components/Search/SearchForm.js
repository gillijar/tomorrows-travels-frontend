import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/search";
import fetchLocations from "../../helpers/fetchLocations";
import Search from "./Search";

const SearchForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isSearching = useSelector((state) => state.search.isSearching);
  const searchedLocation = useSelector(
    (state) => state.search.searchedLocation
  );

  const [searchLocationInput, setSearchLocationInput] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLocations(
      `http://127.0.0.1:3000/api/v1/locations`,
      setIsLoading,
      setAllLocations
    );
    fetchLocations(
      `http://127.0.0.1:3000/api/v1/locations?sort=-numLocations&limit=5`,
      setIsLoading,
      setPopularDestinations
    );
  }, []);

  useEffect(() => {
    const definedLocation = allLocations.filter((loc) =>
      loc.location.includes(searchLocationInput.trim().toLowerCase())
    );
    dispatch(searchActions.setSearchedLocation(definedLocation));
  }, [dispatch, searchLocationInput, allLocations]);

  const inputHandler = (e) => {
    setSearchLocationInput(e.target.value);
  };

  const openSearchHandler = () => {
    dispatch(searchActions.setIsSearching(true));
  };

  const closeSearchHandler = () => {
    dispatch(searchActions.setIsSearching(false));
  };

  const submitLocationHandler = (e) => {
    e.preventDefault();

    if (!searchLocationInput) return;

    dispatch(searchActions.setIsSearching(false));
    const slugLocation = searchLocationInput.split(" ").join("-").toLowerCase();
    history.push(`/destinations?location=${slugLocation}`);
  };

  return (
    <Fragment>
      <form
        className={`${
          isSearching
            ? "home__attention--form in-search"
            : "home__attention--form"
        }`}
        onSubmit={submitLocationHandler}
      >
        <button type="submit" className="home__attention--form-btn">
          <i className="fas fa-search"></i>
        </button>
        <input
          placeholder="Where to?"
          onChange={inputHandler}
          onClick={openSearchHandler}
          autoFocus={props.autoFocus}
        />
        <button
          type="button"
          className={`home__attention--form-btn ${
            isSearching ? "search-open" : "search-close"
          }`}
          onClick={closeSearchHandler}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </form>
      {isSearching && searchLocationInput.length === 0 && (
        <Search
          data={popularDestinations}
          msg="Popular Destinations"
          isLoading={isLoading}
        />
      )}
      {isSearching && searchLocationInput.length > 0 && (
        <Search
          data={searchedLocation}
          search={searchLocationInput}
          msg="Match's Found"
          isLoading={isLoading}
        />
      )}
    </Fragment>
  );
};

export default SearchForm;
