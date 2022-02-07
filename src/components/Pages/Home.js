import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store/location";
import fetchAttractions from "../../helpers/fetchAttractions";
import fetchRestaurants from "../../helpers/fetchRestaurants";

import SearchForm from "../Search/SearchForm";
import TopAttractions from "../Top Attractions/TopAttractions";

const Home = () => {
  const dispatch = useDispatch();

  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [attractionsLoading, setAttractionsLoading] = useState(false);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);

  const loadLimit = window.innerWidth > 1000 ? 4 : 8;

  useEffect(() => {
    fetchAttractions(
      `${process.env.REACT_APP_WEB_HOST}/attractions?sort=-ratingsAverage,-ratings&limit=${loadLimit}`,
      setAttractionsData,
      setAttractionsLoading
    );
    fetchRestaurants(
      `${process.env.REACT_APP_WEB_HOST}/restaurants?sort=-ratingsAverage,-ratings&limit=${loadLimit}`,
      setRestaurantsData,
      setRestaurantsLoading
    );

    dispatch(locationActions.setPageIsHome(true));
  }, [dispatch, loadLimit]);

  return (
    <div className="home">
      <section className="home__attention">
        <SearchForm />
      </section>
      <section className="home__places-section">
        <TopAttractions
          title="Explore Top Attractions"
          data={attractionsData}
          isLoading={attractionsLoading}
        />
        <TopAttractions
          title="Explore Top Places to Eat"
          data={restaurantsData}
          isLoading={restaurantsLoading}
        />
      </section>
      <footer className="layout__footer">
        <p>
          <strong>Disclaimer:</strong> Tomorrow's Travels is strictly a
          portfolio piece. It is heavily inspired by TripAdvisor©, but has no
          means of replacing or competing with them. This website doesn't and
          never will generate revenue.
        </p>
      </footer>
    </div>
  );
};

export default Home;
