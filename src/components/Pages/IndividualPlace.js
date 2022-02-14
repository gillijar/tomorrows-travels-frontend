import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { locationActions } from "../../store/location";
import { useParams, useLocation } from "react-router";
import fetchAttractions from "../../helpers/fetchAttractions";
import fetchRestaurants from "../../helpers/fetchRestaurants";
import thousandsSeparatorFunc from "../../helpers/thousandsSeperator";

import Ratings from "../UI/Ratings";
import SearchForm from "../Search/SearchForm";
import Reviews from "../Reviews/Reviews";
import LoadingSpinner from "../UI/LoadingSpinner";
import hoursOfOp from "../../helpers/hoursOfOp";
import Map from "../UI/Map";

import { animated, useSpring } from "@react-spring/web";

const IndividualPlace = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { pathname } = location;
  const category = pathname.split("/")[1];
  const thousandsSeperator = thousandsSeparatorFunc;

  const isSearching = useSelector((state) => state.search.isSearching);

  useEffect(() => {
    if (category === "attractions")
      fetchAttractions(
        `${process.env.REACT_APP_WEB_HOST}/attractions/${id}`,
        setData,
        setIsLoading
      );
    if (category === "restaurants")
      fetchRestaurants(
        `${process.env.REACT_APP_WEB_HOST}/restaurants/${id}`,
        setData,
        setIsLoading
      );
    dispatch(locationActions.setPageIsHome(false));
  }, [dispatch, category, id]);

  const images = data.images;

  const isOpen = hoursOfOp(data);

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
    <Fragment>
      {isLoading && (
        <div className="loading-container__place">
          <LoadingSpinner styleClass="loading-container__spinner" />
        </div>
      )}
      {!isLoading && (
        <div className="place">
          <div className="place__desktop-container">
            <div className="place__main place__desktop-main">
              <div className="place__main-title">
                <h1>{data.name}</h1>
                {data.hoursOfOperation && (
                  <div>
                    {isOpen && <p className="place__main-open">Open now</p>}
                    {!isOpen && <p className="place__main-close">Closed now</p>}
                    <p className="place__main-hours">{data.hoursOfOperation}</p>
                  </div>
                )}
              </div>
              <div className="place__main-info">
                <i className="fas fa-map-marker-alt"></i>
                <p>{data.address}</p>
              </div>
              <div className="place__main-ratings">
                {data.ratingsAverage > 0 && <Ratings data={data} />}
                {data.ratingsAverage === 0 && <Ratings data={data} />}
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
            {data.description && (
              <div className="place__main-description">
                <p className="place__main-description--heading">About</p>
                <p>{data.description}</p>
              </div>
            )}
            <Map data={data} />
            {data.website && (
              <div className="place__main-website">
                <a href={data.website} target="_blank" rel="noreferrer">
                  <i className="fas fa-globe-americas"></i>
                  <p>Visit Website</p>
                </a>
              </div>
            )}
          </div>
          <Reviews data={data} />
          {isSearching && <SearchForm autoFocus="autoFocus" />}
        </div>
      )}
    </Fragment>
  );
};

export default IndividualPlace;
