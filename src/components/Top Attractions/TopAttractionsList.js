import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store/location";
import thousandsSeperatorFunc from "../../helpers/thousandsSeperator";

import Ratings from "../UI/Ratings";

const TopAttractionsList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const thousandsSeperator = thousandsSeperatorFunc;

  const findAttractionHandler = () => {
    dispatch(locationActions.searchCategory(props.data.category));
    history.push(`/${props.data.category}/${props.data._id}`);
  };

  return (
    <li className="top-att__item" onClick={findAttractionHandler}>
      <div className="top-att__item--container">
        <div className="top-att__item--img-container">
          <img
            className="top-att__item--img"
            src={props.data.images[0]}
            alt="Test"
          />
        </div>
        <div className="top-att__item--info">
          <p className="top-att__item--info-title">{props.data.name}</p>
          <div className="top-att__item--ratings-container">
            <p className="top-att__item--ratings-container-rating">
              {props.data.ratingsAverage.toFixed(1)}
            </p>
            <Ratings data={props.data} />
            <p>{thousandsSeperator(props.data.ratings)}</p>
          </div>
          <p className="top-att__item--tag">{props.data.tag}</p>
        </div>
      </div>
    </li>
  );
};

export default TopAttractionsList;
