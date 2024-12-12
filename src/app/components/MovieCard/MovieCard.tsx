import Image from "next/image";
import { Movie } from "@prisma/client";
import styles from "./movieCard.module.css";
import WatchlistButton from "./WatchlistButton";

type MovieCardProps = {
  movie: Movie;
  index: number;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  return (
    <div className={styles.card}>
      {index}
      {movie.poster.includes("http") && (
        <Image
          src={movie.poster}
          alt=""
          width="75"
          height="111"
          className={styles.poster}
        />
      )}
      <div>
        <div className={styles.title}>
          {movie.title} ({movie.year})
        </div>

        <div className={styles.subHeader}>
          {movie.runtime} {movie.genre}
        </div>
        <p className={styles.plot}>{movie.plot}</p>
        <div className={styles.raatings}>
          🍅 {movie.rottenRating} 🟨 {movie.imdbRating}/10
        </div>

        <button>Rate</button>

        <WatchlistButton movie={movie} />
      </div>
    </div>
  );
};

export default MovieCard;
