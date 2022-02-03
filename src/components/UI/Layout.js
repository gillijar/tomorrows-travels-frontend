import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../../store/search";
import Navigation from "./Navigation";
import NavigationOverlay from "./NavigationOverlay";
import GoToTop from "../../helpers/goToTop";

const Layout = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const verifyAuth =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";

  const [isToggled, setIsToggled] = useState(false);

  const page = useSelector((state) => state.location.pageIsHome);

  const openSearchHandler = () => {
    dispatch(searchActions.setIsSearching(true));
  };

  const goToHomeHandler = () => {
    if (!page) {
      history.push("/");
    }
  };

  const toggleHandler = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <div className="layout">
      <NavigationOverlay toggled={isToggled} />
      <Navigation toggled={isToggled} onClose={toggleHandler} />
      <header className="layout__header">
        <div className="layout__header--btn">
          <button className="layout__header--btn-nav" onClick={toggleHandler}>
            <div className="layout__header--btn-line"></div>
          </button>
        </div>
        <h1 className="layout__header--title" onClick={goToHomeHandler}>
          Tomorrow's Travels
        </h1>
        <div className="layout__header--btn">
          {!page && !verifyAuth && (
            <button
              className="layout__header--btn-search"
              onClick={openSearchHandler}
            >
              <i className="fas fa-search"></i>
            </button>
          )}
        </div>
      </header>
      <main className="layout__main">{props.children}</main>
      <GoToTop />
    </div>
  );
};

export default Layout;
