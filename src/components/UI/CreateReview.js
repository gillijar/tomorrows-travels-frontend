import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import createReviewFunc from "../../helpers/createReview";

const CreateReview = (props) => {
  const { id } = useParams();

  const reviewInputRef = useRef();
  const ratingInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formBody = {
      review: reviewInputRef.current.value,
      rating: ratingInputRef.current.value,
      attraction: id,
      user: "61c272e061b694fee167f817",
    };

    createReviewFunc(`http://127.0.0.1:3000/api/v1/reviews`, formBody);
  };

  return (
    <div style={{ paddingTop: "15rem" }}>
      <p>Leave review for {props.name}</p>
      <form onSubmit={submitFormHandler}>
        <input type="text" placeholder="Enter review" ref={reviewInputRef} />{" "}
        <br />
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
