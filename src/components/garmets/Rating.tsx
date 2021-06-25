import React from "react";
import "./styles/GarmetCard.scss";

type Props = {
  reviews: number;
  rating: number;
};
const Rating = ({ reviews, rating }: Props) => {
  return (
    <>
      <div className="card__body__rating">
        <span>
          <i
            className={
              rating >= 1
                ? "fa fa-star"
                : rating >= 0.5
                ? "fa fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? "fa fa-star"
                : rating >= 1.5
                ? "fa fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? "fa fa-star"
                : rating >= 2.5
                ? "fa fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? "fa fa-star"
                : rating >= 3.5
                ? "fa fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? "fa fa-star"
                : rating >= 4.5
                ? "fa fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
        <span>{reviews + " reviews"}</span>
      </div>
    </>
  );
};

export default Rating;
