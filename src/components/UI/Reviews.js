import React, { useState } from "react";
import CreateReview from "../UI/CreateReview";

const Reviews = (props) => {
  const [createReview, setCreateReview] = useState(false);

  const addReviewHandler = () => {
    setCreateReview(true);
  };

  return (
    <div className="reviews">
      <h3 onClick={addReviewHandler}>
        Reviews ({props.data.reviews && props.data.reviews.length})
      </h3>
      <ul>
        {props.data.reviews &&
          props.data.reviews.map((rev) => (
            <li key={rev._id}>
              <p className="reviews__name">{rev.user.name}</p>
              <p className="reviews__text">{rev.review}</p>
            </li>
          ))}
      </ul>
      {createReview && <CreateReview name={props.data.name} />}
    </div>
  );
};

export default Reviews;
