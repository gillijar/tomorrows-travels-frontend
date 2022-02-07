import React, { useRef } from "react";
import createDestination from "../../../helpers/createDestination";
import statesList from "../../../helpers/states";

const CreateDestinationInput = (props) => {
  const states = statesList;

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const addressInputRef = useRef();
  const priceInputRef = useRef();
  const summaryInputRef = useRef();
  const descriptionInputRef = useRef();
  const websiteInputRef = useRef();
  const tagInputRef = useRef();
  const imagesInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const images = imagesInputRef.current.value;
    const arrayOfImages = images.split(",");

    const formBody = {
      name: nameInputRef.current.value,
      city: cityInputRef.current.value,
      state: stateInputRef.current.value,
      address: addressInputRef.current.value,
      price: priceInputRef.current.value,
      summary: summaryInputRef.current.value,
      description: descriptionInputRef.current.value,
      images: arrayOfImages,
      website: websiteInputRef.current.value,
      tag: tagInputRef.current.value,
      category: `${props.type.toLowerCase()}s`,
    };

    createDestination(
      `${process.env.REACT_APP_WEB_HOST}/${props.type.toLowerCase()}s`,
      formBody
    );
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          ref={nameInputRef}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="Enter city"
          ref={cityInputRef}
        />
      </div>
      <div>
        <label htmlFor="state">State</label>
        <select id="state" ref={stateInputRef}>
          {states.map((state) => {
            return <option key={state}>{state}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          placeholder="Enter address"
          ref={addressInputRef}
        />
      </div>
      <div>
        <label htmlFor="summary">Summary</label>
        <input
          id="summary"
          type="text"
          placeholder="Enter summary"
          ref={summaryInputRef}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
          ref={descriptionInputRef}
        />
      </div>
      <div>
        <label htmlFor="images">Images</label>
        <input
          id="images"
          type="text"
          placeholder="Enter images"
          ref={imagesInputRef}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          placeholder="Enter website"
          ref={websiteInputRef}
        />
      </div>
      <div>
        <label htmlFor="hours-of-operation">Hours of operation</label>
        <input
          id="hours-of-operation"
          type="text"
          placeholder="Enter hours of operation"
          ref={websiteInputRef}
        />
      </div>
      <div>
        <label htmlFor="tag">Tag</label>
        <input id="tag" type="text" placeholder="Enter tag" ref={tagInputRef} />
      </div>
      <div className="create-dest__button">
        <button type="submit" className="auth__div-button">
          Create {props.type}
        </button>
      </div>
    </form>
  );
};

export default CreateDestinationInput;
