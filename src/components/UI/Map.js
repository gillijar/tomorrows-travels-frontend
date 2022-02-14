import React from "react";

const Map = (props) => {
  const attAddress = props.data.address;
  let address;

  if (attAddress) {
    address = attAddress.split(" ").join("%20");
  }

  console.log(address);

  return (
    <div className="map__container">
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
