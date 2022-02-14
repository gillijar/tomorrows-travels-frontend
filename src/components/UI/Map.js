import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const Map = (props) => {
  let address;
  const attAddress = props.data.address;

  if (attAddress) {
    address = attAddress.split(" ").join("%20");
  }

  return (
    <div className="map__container">
      <LoadingSpinner styleClass="map__container--loading" />
      <div className="map__canvas">
        <iframe
          className="map__frame"
          title={props.data.name}
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          scrolling="yes"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
