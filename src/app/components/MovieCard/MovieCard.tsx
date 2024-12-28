import Image from "next/image";
import { Movie } from "@prisma/client";
import styles from "./movieCard.module.css";
import WatchlistButton from "./WatchlistButton";
import UserRating from "./UserRating";

type MovieCardProps = {
  movie: Movie;
  index: number;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
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

      {/* -------------- HEADER -------------- */}
      <div className={styles.header}>
        <div className={styles.index}>{index}</div>
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
      <p className={styles.plot}>{movie.plot}</p>

      {/* -------------- FOOTER -------------- */}
      <div className={styles.footer}>
        <button className={styles.rate_button}>Rate</button>
        <UserRating movie={movie} rating={movie.userRating} />
        <div className={styles.footer_right_buttons}>
          <WatchlistButton movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
