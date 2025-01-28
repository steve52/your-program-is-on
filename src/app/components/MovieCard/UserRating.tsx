"use client";

import { MouseEventHandler, useState } from "react";
import style from "./userrating.module.css";
import { addMovie, addUnsavedMovie, updateMovie } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { Movie } from "@prisma/client";
import { UnsavedMovie } from "@/types/types";

type UserRatingProps = {
  movie: Movie | UnsavedMovie;
  rating: number | null;
};

const UserRating: React.FC<UserRatingProps> = ({ movie, rating }) => {
  let [fauxRating, setFauxRating] = useState(0);
  const router = useRouter();

  const popcorns = [];

  const handleOnMouseEnter: MouseEventHandler<HTMLButtonElement> = (e) => {
    setFauxRating(Number(e.currentTarget.dataset["position"]));
  };

  const handleOnMouseLeave: MouseEventHandler<HTMLButtonElement> = (e) => {
    setFauxRating(0);
  };

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const rating = e.currentTarget.dataset["position"];
    if (!rating) {
      console.warn("Img element missing data-position value");
      return;
    }
    if ("id" in movie) {
      await updateMovie(movie, { userRating: Number(rating) });
    } else {
      await addUnsavedMovie(movie, { userRating: Number(rating) });
    }
    router.refresh();
  };

  for (let x = 1; x <= 5; x++) {
    const showFilled =
      (!fauxRating && rating && x <= rating) || x <= fauxRating;
    const className = `${style.slot} ${showFilled ? style.slotFilled : ""}`;

    popcorns.push(
      <button
        key={x}
        data-position={x}
        className={className}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
      />
    );
  }
  return <div className={style.popcorns}>{popcorns}</div>;
};

export default UserRating;
