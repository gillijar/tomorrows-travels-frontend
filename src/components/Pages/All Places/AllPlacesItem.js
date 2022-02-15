import React from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { locationActions } from "../../../store/location";
import thousandsSeparatorFunc from "../../../helpers/thousandsSeperator";
import Ratings from "../../UI/Ratings";

const AllPlacesItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  let description;

  const thousandsSeperator = thousandsSeparatorFunc;

  if (props.data.description) {
    description = props.data.description.split(" ").slice(0, 30);
  }

  const findPlaceHandler = () => {
    dispatch(locationActions.searchCategory(props.data.category));
    history.push(`/${props.data.category}/${props.data._id}`);
  };

  return (
    <li className="places__list-item" onClick={findPlaceHandler}>
      <div className="places__list-item--img-container">
        <img src={props.data.images[0]} alt="test" />
      </div>
      <div className="places__list-item--info">
        <p className="places__list-item--info-title">
          {props.index}. {props.data.name}
        </p>
        <div className="places__list-item--info-ratings">
          <p className="places__list-item--info-ratings-rating">
            {props.data.ratingsAverage.toFixed(1)}
          </p>
          <Ratings data={props.data} />
          <p>{thousandsSeperator(props.data.ratings)}</p>
        </div>
        <p>{props.data.tag}</p>
        <p>{props.data.hoursOfOperation.split(" ").slice(0, -1).join(" ")}</p>
        {description && (
          <p className="places__list-item--info-desc">{`${
            description.length >= 30
              ? description.join(" ") + "..."
              : description.join(" ")
          }`}</p>
        )}
      </div>
    </li>
  );
};

export default AllPlacesItem;
