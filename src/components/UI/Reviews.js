import React, { useState } from "react";
import CreateReview from "../UI/CreateReview";

const Reviews = (props) => {
  const [createReview, setCreateReview] = useState(false);

  const addReviewHandler = () => {
    setCreateReview((prevState) => !prevState);
  };

  return (
    <div className="reviews">
      <div className="reviews__heading">
        <h3>Reviews ({props.data.reviews && props.data.reviews.length})</h3>
        <i
          className="far fa-plus-square reviews__add"
          onClick={addReviewHandler}
        ></i>
      </div>
      {props.data.reviews && props.data.reviews.length === 0 && (
        <p className="reviews__empty">Be the first to leave a review!</p>
      )}
      <ul>
        {props.data.reviews &&
          props.data.reviews.map((rev) => (
            <li key={rev._id}>
              <p className="reviews__name">{rev.user}</p>
              <p className="reviews__text">{rev.review}</p>
            </li>
          ))}
      </ul>
      {createReview && (
        <CreateReview name={props.data.name} onClose={addReviewHandler} />
      )}
    </div>
  );
};

export default Reviews;
