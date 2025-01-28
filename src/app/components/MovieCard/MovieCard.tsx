"use client";

import Image from "next/image";
import { Movie } from "@prisma/client";
import styles from "./movieCard.module.css";
import WatchlistButton from "./WatchlistButton";
import UserRating from "./UserRating";
import { useState } from "react";
import { moveDownWatchList, moveUpWatchList } from "@/actions/actions";
import { useRouter } from "next/navigation";
import { UnsavedMovie } from "@/types/types";
import { isSavedMovie } from "@/utils";

type MovieCardProps = {
  movie: Movie | UnsavedMovie;
  index?: number;
  isWatchList: boolean;
};

type TrunctatedTextProps = {
  className: string;
  text: string;
};

const truncatedText = (text: string, numChars: number): string => {
  return text.substring(0, numChars) + "...";
};
const TruncatedText: React.FC<TrunctatedTextProps> = ({ className, text }) => {
  const tooLong = text.length > 184;
  const [showAll, setShowAll] = useState(!tooLong);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <>
      <p className={className}>
        {!tooLong && <>{text}</>}
        {tooLong &&
          (showAll ? (
            <>
              {text}&nbsp;
              <button className={styles.readmore} onClick={toggleShowAll}>
                less
              </button>
            </>
          ) : (
            <>
              {truncatedText(text, 184)}
              <button className={styles.readmore} onClick={toggleShowAll}>
                more.
              </button>
            </>
          ))}
      </p>
    </>
  );
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, index, isWatchList }) => {
  const router = useRouter();
  const [showRating, setShowRating] = useState(
    isSavedMovie(movie) ? !!movie.userRating : false
  );

  const handleRateBtnClick = () => {
    setShowRating(true);
  };

  const handleMoveDown = async () => {
    if (!isSavedMovie(movie)) return;
    await moveDownWatchList(movie);
    router.refresh();
  };

  const handleMoveUp = async () => {
    if (!isSavedMovie(movie)) return;
    await moveUpWatchList(movie);
    router.refresh();
  };

  return (
    <div className={styles.card}>
      {/* -------------- POSTER -------------- */}
      {movie.poster.includes("http") && (
        <Image
          src={movie.poster}
          alt=""
          width="75"
          height="111"
          className={styles.poster}
        />
      )}
      {isWatchList && (
        <div className={styles.sortControls}>
          <button className={styles.sortArrow} onClick={handleMoveDown}>
            <Image src="down.svg" alt="" width="24" height="24" />
          </button>
          <button className={styles.sortArrow} onClick={handleMoveUp}>
            <Image src="up.svg" alt="" width="24" height="24" />
          </button>
        </div>
      )}

      {/* -------------- HEADER -------------- */}
      <div className={styles.header}>
        {isWatchList && <div className={styles.index}>{index}</div>}
        <div className={styles.title_and_info}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.info}>
            <div>
              {movie.year} • {movie.runtime}
            </div>
            <div>{movie.genre.split(", ").join(" • ")}</div>
          </div>
        </div>
      </div>

      {/* -------------- RATINGS -------------- */}
      <div className={styles.ratings}>
        <span className={styles.rating}>
          <div className={styles.rating_logo_imdb}></div>
          {movie.imdbRating}/10
        </span>
        <span className={styles.rating}>
          <div className={styles.rating_logo_tomatoes}></div>
          {movie.rottenRating}
        </span>
      </div>

      {/* -------------- PLOT -------------- */}
      <TruncatedText className={styles.plot} text={movie.plot}></TruncatedText>

      {/* -------------- FOOTER -------------- */}
      <div className={styles.footer}>
        <div className={styles.rate}>
          {!showRating && (
            <button className={styles.rate_button} onClick={handleRateBtnClick}>
              Rate
            </button>
          )}
          {showRating && <UserRating movie={movie} rating={movie.userRating} />}
        </div>

        <div className={styles.footer_right_buttons}>
          <WatchlistButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
