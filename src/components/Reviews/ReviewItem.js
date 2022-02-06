import React, { useState } from "react";

const ReviewItem = (props) => {
  const [isExtended, setIsExtended] = useState(false);

  const reviewLength = props.data.review.split(" ");

  const extendListHandler = () => {
    setIsExtended((prevState) => !prevState);
  };

  return (
    <li className="reviews__item">
      <div className="reviews__main">
        <p className="reviews__name">{props.data.user}</p>
        <div className="reviews__created">
          <p>{new Date(props.data.createdAt).toLocaleDateString()}</p>
          <p>
            Rating:{" "}
            <span>
              <b>{props.data.rating}</b>
            </span>
          </p>
        </div>
      </div>
      <p className={!isExtended ? "reviews__text" : "reviews__text--extended"}>
        {props.data.review}
      </p>
      {reviewLength.length > 40 && (
        <p className="reviews__see-more" onClick={extendListHandler}>
          See {!isExtended ? "more" : "less"}...
        </p>
      )}
    </li>
  );
};

export default ReviewItem;
