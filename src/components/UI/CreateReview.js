import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import createReviewFunc from "../../helpers/createReview";

const CreateReview = (props) => {
  const [hasError, setHasError] = useState({});

  const { id } = useParams();

  const userInputRef = useRef();
  const reviewInputRef = useRef();
  const ratingInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formBody = {
      review: reviewInputRef.current.value,
      rating: ratingInputRef.current.value,
      destination: id,
      user: userInputRef.current.value,
    };

    createReviewFunc(
      `${process.env.REACT_APP_WEB_HOST}/reviews`,
      formBody,
      props.onClose,
      setHasError
    );
  };

  return (
    <div className="reviews__create">
      {hasError.message && (
        <div className="auth__msg auth__msg-error">
          <p>{hasError.message}</p>
        </div>
      )}
      <i
        className="fas fa-times reviews__create--close"
        onClick={props.onClose}
      ></i>
      <p className="reviews__create--location">
        Leave review for <span>{props.name}</span>
      </p>
      <form onSubmit={submitFormHandler}>
        <input type="text" placeholder="Enter name" ref={userInputRef} />
        <textarea type="text" placeholder="Enter review" ref={reviewInputRef} />
        <input
          type="text"
          min="1"
          max="5"
          placeholder="Enter rating"
          ref={ratingInputRef}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateReview;
