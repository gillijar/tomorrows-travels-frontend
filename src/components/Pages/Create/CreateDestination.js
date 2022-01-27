import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { locationActions } from "../../../store/location";
import CreateDestinationInput from "./CreateDestinationInput";

const CreateDestination = () => {
  const [type, setType] = useState("Attraction");

  const setAttraction = () => {
    setType("Attraction");
  };

  const setRestaurant = () => {
    setType("Restaurant");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(locationActions.setPageIsHome(false));
  }, [dispatch]);

  return (
    <div className="create-dest">
      <div className="create-dest__type">
        <p
          className={type === "Attraction" ? "create-dest__active" : ""}
          onClick={setAttraction}
        >
          Create Attraction
        </p>
        <p
          className={type === "Restaurant" ? "create-dest__active" : ""}
          onClick={setRestaurant}
        >
          Create Restaurant
        </p>
      </div>
      <div className="create-dest__main">
        <CreateDestinationInput type={type} />
      </div>
    </div>
  );
};

export default CreateDestination;
