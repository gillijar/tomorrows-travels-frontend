import React from "react";
import { useHistory } from "react-router-dom";

const DesktopNav = () => {
  const history = useHistory();

  const createDestHandler = () => {
    history.push("/create-destination");
  };

  const goToAuthHandler = () => {
    history.push("/login");
  };

  return (
    <nav className="desktop__nav">
      <ul>
        <li>Write a review</li>
        <li onClick={createDestHandler}>Create Destination</li>
        <li className="desktop__nav-user" onClick={goToAuthHandler}>
          <i className="fas fa-user"></i>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
