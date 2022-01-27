import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../../store/location";
import { useLocation } from "react-router";

import fetchAttractions from "../../../helpers/fetchAttractions";
import fetchRestaurants from "../../../helpers/fetchRestaurants";
import TopAttractions from "../../Top Attractions/TopAttractions";
import SearchForm from "../../Search/SearchForm";

const Destinations = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;

  const isSearching = useSelector((state) => state.search.isSearching);

  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  const city = search
    .split("&")[0]
    .replace("?location=", "")
    .split("_")[0]
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    fetchAttractions(
      `http://127.0.0.1:3000/api/v1/attractions${search}`,
      setAttractionsData
    );

    fetchRestaurants(
      `http://127.0.0.1:3000/api/v1/restaurants${search}`,
      setRestaurantsData
    );

    dispatch(locationActions.setPageIsHome(false));
  }, [dispatch, search]);

  return (
    <Fragment>
      {attractionsData.length === 0 && restaurantsData.length === 0 && (
        <p>No results found.</p>
      )}
      {(attractionsData.length !== 0 || restaurantsData.length !== 0) && (
        <div className="destinations">
          <div>
            <h1 className="destinations__section--city">
              Explore <span>{city}</span>
            </h1>
          </div>
          {attractionsData.length !== 0 && (
            <section className="destinations__section">
              <TopAttractions
                data={attractionsData}
                desc="Places to see, ways to wander, and signature experiences."
                category="attractions"
                title="Do"
              />
            </section>
          )}
          {restaurantsData.length !== 0 && (
            <section className="destinations__section">
              <TopAttractions
                data={restaurantsData}
                desc="Can't-miss spots to dine, drink, and feast."
                category="restaurants"
                title="Eat"
              />
            </section>
          )}
          {isSearching && <SearchForm autoFocus="autoFocus" />}
        </div>
      )}
    </Fragment>
  );
};

export default Destinations;
