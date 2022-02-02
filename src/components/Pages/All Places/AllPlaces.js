import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import AllPlacesItem from "./AllPlacesItem";
import SearchForm from "../../Search/SearchForm";
import fetchAttractions from "../../../helpers/fetchAttractions";
import fetchRestaurants from "../../../helpers/fetchRestaurants";

const AllPlaces = () => {
  const location = useLocation();
  const { search } = location;
  const { pathname } = location;

  const [data, setData] = useState([]);
  const category = pathname.replace("/", "");
  const isSearching = useSelector((state) => state.search.isSearching);
  let i = 0;
  const city = search
    .split("&")[0]
    .replace("?location=", "")
    .split("_")[0]
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    if (category === "attractions") {
      fetchAttractions(
        `${process.env.REACT_APP_WEB_HOST}/attractions${search}`,
        setData
      );
    } else if (category === "restaurants") {
      fetchRestaurants(
        `${process.env.REACT_APP_WEB_HOST}/restaurants${search}`,
        setData
      );
    }
  }, [search, category]);

  return (
    <div className="places">
      {category === "attractions" && (
        <h1 className="places__title">
          Things to do in <span>{city}</span>
        </h1>
      )}
      {category === "restaurants" && (
        <h1 className="places__title">
          Places to eat in <span>{city}</span>
        </h1>
      )}
      <section className="places__section">
        <p className="places__section--amount">
          {data.length} results found...
        </p>
        <ul className="places__section--list">
          {data.map((item) => {
            i++;
            return <AllPlacesItem key={item._id} data={item} index={i} />;
          })}
        </ul>
      </section>
      {isSearching && <SearchForm autoFocus="autoFocus" />}
    </div>
  );
};

export default AllPlaces;
