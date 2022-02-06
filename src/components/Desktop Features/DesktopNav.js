import React from "react";

const DesktopNav = () => {
  return (
    <nav className="desktop__nav">
      <ul>
        <li>Write a review</li>
        <li>Create Destination</li>
        <li className="desktop__nav-user">
          <i className="fas fa-user"></i>
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
