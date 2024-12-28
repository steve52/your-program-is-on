"use client";

import { MouseEventHandler, useState } from "react";
import style from "./userrating.module.css";
import { updateMovie } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { Movie } from "@prisma/client";

type UserRatingProps = {
  movie: Movie;
  rating: number | null;
};

const UserRating: React.FC<UserRatingProps> = ({ movie, rating }) => {
  let [fauxRating, setFauxRating] = useState(0);
  const router = useRouter();

  const popcorns = [];

  const handleOnMouseEnter: MouseEventHandler<HTMLImageElement> = (e) => {
    setFauxRating(Number(e.currentTarget.dataset["position"]));
  };

  const handleOnMouseLeave: MouseEventHandler<HTMLImageElement> = (e) => {
    setFauxRating(0);
  };

  const handleOnClick: MouseEventHandler<HTMLImageElement> = (e) => {
    const rating = e.currentTarget.dataset["position"];
    if (!rating) {
      console.warn("Img element missing data-position value");
      return;
    }
    console.log({ rating });
    updateMovie(movie, { userRating: Number(rating) });
    router.refresh();
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
          onClick={handleOnClick}
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
          onClick={handleOnClick}
        />
      );
    }
  }
  return <div className={style.popcorns}>{popcorns}</div>;
};

export default UserRating;
