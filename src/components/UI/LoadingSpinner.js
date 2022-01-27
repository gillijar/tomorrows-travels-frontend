import React from "react";

const LoadingSpinner = (props) => {
  return (
    <div className={`spinner-container ${props.styleClass}`}>
      <i className={"fas fa-circle-notch loading-spinner"}></i>
    </div>
  );
};

export default LoadingSpinner;
