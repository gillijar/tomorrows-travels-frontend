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

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formBody = {
      name: nameInputRef.current.value,
      city: cityInputRef.current.value,
      state: stateInputRef.current.value,
      address: addressInputRef.current.value,
      price: priceInputRef.current.value,
      summary: summaryInputRef.current.value,
      description: descriptionInputRef.current.value,
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
          placeholder="Enter attraction name"
          ref={nameInputRef}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="Enter attraction city"
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
          placeholder="Enter attraction address"
          ref={addressInputRef}
        />
      </div>
      <div>
        {/* This needs fixed to be an input */}
        <label htmlFor="price">Price</label>
        <select id="price" ref={priceInputRef}>
          <option>0</option>
        </select>
      </div>
      <div>
        <label htmlFor="summary">Summary</label>
        <input
          id="summary"
          type="text"
          placeholder="Enter attraction summary"
          ref={summaryInputRef}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Enter attraction description"
          ref={descriptionInputRef}
        />
      </div>
      {/* images */}
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          placeholder="Enter attraction website"
          ref={websiteInputRef}
        />
      </div>
      <div>
        <label htmlFor="tag">Tag</label>
        <input
          id="tag"
          type="text"
          placeholder="Enter attraction tag"
          ref={tagInputRef}
        />
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
