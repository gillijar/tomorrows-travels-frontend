import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../../store/location";
import fetchAttractions from "../../../helpers/fetchAttractions";
import fetchRestaurants from "../../../helpers/fetchRestaurants";

import SearchForm from "../../Search/SearchForm";
import TopAttractions from "../../Top Attractions/TopAttractions";

const Home = () => {
  const dispatch = useDispatch();

  const [attractionsData, setAttractionsData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    fetchAttractions(
      `http://127.0.0.1:3000/api/v1/attractions?sort=-ratingsAverage,-ratings&limit=4`,
      setAttractionsData
    );
    fetchRestaurants(
      `http://127.0.0.1:3000/api/v1/restaurants?sort=-ratingsAverage,-ratings&limit=4`,
      setRestaurantsData
    );

    dispatch(locationActions.setPageIsHome(true));
  }, [dispatch]);

  return (
    <div className="home">
      <section className="home__attention">
        <SearchForm />
      </section>
      <section className="home__places-section">
        <TopAttractions
          title="Explore Top Attractions"
          data={attractionsData}
        />
        <TopAttractions
          title="Explore Top Places to Eat"
          data={restaurantsData}
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
