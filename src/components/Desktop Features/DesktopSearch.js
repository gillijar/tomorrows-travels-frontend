import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import DesktopSearchList from "../Desktop Features/DesktopSearchList";
const DesktopSearch = (props) => {
  return (
    <div className="desktop__search">
      <ul className="desktop__search-list">
        {props.isLoading && <LoadingSpinner />}
        {props.data.length > 0 && (
          <p className="desktop__search-list-msg">{props.msg}</p>
        )}
        {props.data.length === 0 && props.search && (
          <p className="desktop__search-list-msg">No results found</p>
        )}
        {props.data &&
          props.data.map((location) => (
            <DesktopSearchList key={location.city} data={location} />
          ))}
      </ul>
    </div>
  );
};

export default DesktopSearch;
