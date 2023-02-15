import React from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import SearchList from "./SearchList";

const Search = (props) => {
  return (
    <div className="search">
      <ul className="search__list">
        {props.isLoading && <LoadingSpinner styleClass={"search__loader"} />}
        {props.data.length > 0 && (
          <p className="search__list-msg">{props.msg}</p>
        )}
        {props.data.length === 0 && props.search && (
          <p className="search__list-msg">No results found</p>
        )}
        {props.data &&
          props.data.map((location) => (
            <SearchList key={location.city} data={location} />
          ))}
      </ul>
    </div>
  );
};

export default Search;
