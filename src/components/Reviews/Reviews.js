import React, { useState } from "react";
import CreateReview from "./CreateReview";
import ReviewItem from "./ReviewItem";

const Reviews = (props) => {
  const [createReview, setCreateReview] = useState(false);

  const addReviewHandler = () => {
    setCreateReview((prevState) => !prevState);
  };

  let allReviews = props.data.reviews;
  if (allReviews && allReviews.length > 1) {
    allReviews = allReviews.reverse();
  }

  return (
    <div className="reviews">
      <div className="reviews__heading">
        <h3>Reviews ({allReviews && allReviews.length})</h3>
        <i
          className="far fa-plus-square reviews__add"
          onClick={addReviewHandler}
        ></i>
      </div>
      {allReviews && allReviews.length === 0 && (
        <p className="reviews__empty">Be the first to leave a review!</p>
      )}
      <ul>
        {allReviews &&
          allReviews.map((rev) => <ReviewItem key={rev._id} data={rev} />)}
      </ul>
      {createReview && (
        <CreateReview name={props.data.name} onClose={addReviewHandler} />
      )}
    </div>
  );
};

export default Reviews;
