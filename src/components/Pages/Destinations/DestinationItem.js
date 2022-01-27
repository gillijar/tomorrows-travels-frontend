import React from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../store/location";
import { useHistory } from "react-router";

const DestinationItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const findAttractionHandler = () => {
    dispatch(locationActions.searchCategory(props.data.category));
    history.push(`/id/${props.data._id}`);
  };

  return (
    <li onClick={findAttractionHandler}>
      <h1>{props.data.name}</h1>
      <p>
        {props.data.city}, {props.data.state}
      </p>
      <p>{props.data.description}</p>
      <p>
        <strong>
          {props.data.price === 0 ? "Free" : `$${props.data.price}`}
        </strong>
      </p>
      <p>{props.data.tag}</p>
    </li>
  );
};

export default DestinationItem;
