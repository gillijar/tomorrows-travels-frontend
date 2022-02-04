import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../store/location";
import { useParams, useLocation } from "react-router";
import fetchAttractions from "../helpers/fetchAttractions";
import fetchRestaurants from "../helpers/fetchRestaurants";
import thousandsSeparatorFunc from "../helpers/thousandsSeperator";

import Ratings from "./UI/Ratings";
import SearchForm from "./Search/SearchForm";
import Reviews from "./UI/Reviews";

import { animated, useSpring } from "@react-spring/web";

const IndividualPlace = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { pathname } = location;
  const category = pathname.split("/")[1];
  const thousandsSeperator = thousandsSeparatorFunc;

  const isSearching = useSelector((state) => state.search.isSearching);

  useEffect(() => {
    if (category === "attractions")
      fetchAttractions(
        `${process.env.REACT_APP_WEB_HOST}/attractions/${id}`,
        setData
      );
    if (category === "restaurants")
      fetchRestaurants(
        `${process.env.REACT_APP_WEB_HOST}/restaurants/${id}`,
        setData
      );
    dispatch(locationActions.setPageIsHome(false));
  }, [dispatch, category, id]);

  const images = data.images;

  // let isOpen = true;
  let isOpen;

  // TESTING
  if (data.hoursOfOperation) {
    const date = new Date();

    const opHours = data.hoursOfOperation.split(" - ");
    const morningHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const eveningHours = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let open = opHours[0].split(" ");
    let close = opHours[1].split(" ");
    let openingHour = +open[0].split(":")[0];
    let closingHour = +close[0].split(":")[0];

    if (open.includes("AM")) {
      openingHour = morningHours[openingHour];
    } else {
      openingHour = eveningHours[openingHour];
    }

    if (close.includes("PM")) {
      closingHour = eveningHours[closingHour];
    } else {
      closingHour = morningHours[closingHour];
    }

    isOpen = date.getHours() > openingHour && date.getHours() < closingHour;
  }

  // END TESTING

  const [curSlide, setCurSlide] = useState(0);

  let maxSlide;
  if (images) {
    maxSlide = images.length - 1;
  }

  const { x } = useSpring({
    x: curSlide * 100,
  });

  const nextSlide = () => {
    if (curSlide === maxSlide) {
      setCurSlide(0);
    } else {
      setCurSlide((prevState) => prevState + 1);
    }
  };

  const prevSlide = () => {
    if (curSlide === 0) {
      setCurSlide(maxSlide);
    } else {
      setCurSlide((prevState) => prevState - 1);
    }
  };

  return (
    <div className="place">
      <div className="place__desktop-container">
        <div className="place__main place__desktop-main">
          <div className="place__main-title">
            <h1>{data.name}</h1>
            <div>
              <p className="place__main-open">
                {isOpen ? "Open now" : "Closed now"}
              </p>
              <p className="place__main-hours">{data.hoursOfOperation}</p>
            </div>
          </div>
          <div className="place__main-info">
            <i className="fas fa-map-marker-alt"></i>
            <p>
              {data.address}, {data.city} {data.state}
            </p>
          </div>
          <div className="place__main-ratings">
            {data.ratingsAverage && <Ratings data={data} />}
            {data.ratings && <p>{thousandsSeperator(data.ratings)}</p>}
          </div>
          <p className="place__main-tag">{data.tag}</p>
        </div>
        <div className="place__img">
          <div className="place__img-arrow">
            <div className="place__img-left" onClick={prevSlide}>
              <i className="fas fa-arrow-left"></i>
            </div>
            <div className="place__img-right" onClick={nextSlide}>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          <div className="place__img-amount">
            <i className="far fa-images"></i>
            <p>{images && images.length}</p>
          </div>
          <animated.div
            className="place__img-container"
            style={{ transform: x.to((x) => `translateX(-${x}%)`) }}
          >
            {images &&
              images.map((img, i) => <img key={i} src={img} alt="test" />)}
          </animated.div>
        </div>
      </div>
      <div className="place__main">
        <div className="place__main-description">
          <p className="place__main-description--heading">About</p>
          <p>{data.description}</p>
        </div>
        <div className="place__main-website">
          <a href={data.website} target="_blank" rel="noreferrer">
            <i className="fas fa-globe-americas"></i>
            <p>Visit Website</p>
          </a>
        </div>
      </div>
      <Reviews data={data} />
      {isSearching && <SearchForm autoFocus="autoFocus" />}
    </div>
  );
};

export default IndividualPlace;
