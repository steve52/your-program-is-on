"use client";

import { MouseEventHandler, useState } from "react";
import style from "./userrating.module.css";

type UserRatingProps = {
  rating?: number;
};

const UserRating: React.FC<UserRatingProps> = ({ rating }) => {
  let [fauxRating, setFauxRating] = useState(0);
  const popcorns = [];
  const handleOnMouseEnter: MouseEventHandler<HTMLImageElement> = (e) => {
    setFauxRating(Number(e.currentTarget.dataset["position"]));
  };
  const handleOnMouseLeave: MouseEventHandler<HTMLImageElement> = (e) => {
    setFauxRating(0);
  };

  for (let x = 1; x <= 5; x++) {
    if ((!fauxRating && rating && x <= rating) || x <= fauxRating) {
      popcorns.push(
        <img
          src="./popcorn.svg"
          key={x}
          data-position={x}
          className={style.slot}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      );
    } else {
      popcorns.push(
        <img
          src="./popcorn_empty.svg"
          key={x}
          data-position={x}
          className={style.slot}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      );
    }
  }
  return <div className={style.popcorns}>{popcorns}</div>;
};

export default UserRating;
