import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/search";
import fetchLocations from "../../helpers/fetchLocations";
import DesktopSearch from "./DesktopSearch";

const DesktopSearchForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isSearching = useSelector((state) => state.search.desktopIsSearching);
  const searchedLocation = useSelector(
    (state) => state.search.searchedLocation
  );

  const [searchLocationInput, setSearchLocationInput] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLocations(
      `${process.env.REACT_APP_WEB_HOST}/locations`,
      setIsLoading,
      setAllLocations
    );
    fetchLocations(
      `${process.env.REACT_APP_WEB_HOST}/locations?sort=-numLocations&limit=5`,
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
    dispatch(searchActions.setDesktopIsSearching(true));
  };

  const closeSearchHandler = () => {
    dispatch(searchActions.setDesktopIsSearching(false));
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
      <div
        className={`${
          isSearching
            ? "home__attention--form-backdrop"
            : "home__attention--form-backdrop-active"
        }`}
      ></div>
      <form className="desktop__search--form" onSubmit={submitLocationHandler}>
        <button type="submit" className="desktop__search--form-btn">
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
        {isSearching && searchLocationInput.length === 0 && (
          <DesktopSearch
            data={popularDestinations}
            msg="Popular Destinations"
            isLoading={isLoading}
          />
        )}
        {isSearching && searchLocationInput.length > 0 && (
          <DesktopSearch
            data={searchedLocation}
            search={searchLocationInput}
            msg="Match's Found"
            isLoading={isLoading}
          />
        )}
      </form>
    </Fragment>
  );
};

export default DesktopSearchForm;
