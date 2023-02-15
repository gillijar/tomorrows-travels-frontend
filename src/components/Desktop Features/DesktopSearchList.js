import React from "react";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/search";
import { useHistory } from "react-router";

const SearchList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const selectLocationHandler = () => {
    dispatch(searchActions.setDesktopIsSearching(false));
    dispatch(searchActions.setDesktopSearchInput(""));
    history.push(`/destinations?location=${props.data.searchLocation}`);
  };

  return (
    <li className="desktop__search-list--item" onClick={selectLocationHandler}>
      <div className="desktop__search-list--item-pin">
        <i className="fas fa-map-marker-alt"></i>
      </div>
      <div className="desktop__search-list--item-info">
        <p className="desktop__search-list--item-info-city">
          {props.data.city}
        </p>
        <div>
          <p className="desktop__search-list--item-info-state">
            {props.data.state}
          </p>
        </div>
      </div>
    </li>
  );
};

export default SearchList;
