import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import TopAttractionsList from "./TopAttractionsList";
import LoadingSpinner from "../UI/LoadingSpinner";

const TopAttractions = (props) => {
  const history = useHistory();
  const location = useLocation();

  let { search } = location;
  search = search.split("&")[0];

  const page = useSelector((state) => state.location.pageIsHome);

  const allAttractionsHandler = () => {
    history.push(`/${props.category}${search}`);
  };

  return (
    <div className="top-att">
      <p className="top-att__title">{props.title}</p>
      {!page && <p className="top-att__desc">{props.desc}</p>}
      {!page && (
        <p className="top-att__see-all" onClick={allAttractionsHandler}>
          See all
        </p>
      )}
      <ul className="top-att__list">
        {props.isLoading && (
          <div className="loading-container">
            <LoadingSpinner styleClass="loading-container__spinner" />
          </div>
        )}
        {props.data &&
          !props.isLoading &&
          props.data.map((att) => (
            <TopAttractionsList key={att._id} data={att} />
          ))}
      </ul>
    </div>
  );
};

export default TopAttractions;
