import React from "react";

const Ratings = (props) => {
  let rating = props.data.ratingsAverage;
  const circles = [1, 2, 3, 4, 5];

  return (
    <div className="ratings">
      {circles.map((cir) => {
        if (cir !== 1) {
          rating -= 1;
        }

        return (
          <div
            key={props.data._id + cir}
            className={`ratings__circle ${rating >= 0.8 && "full"} ${
              rating < 0.8 && rating > 0.25 && "half"
            }`}
          ></div>
        );
      })}
    </div>
  );
};

export default Ratings;
