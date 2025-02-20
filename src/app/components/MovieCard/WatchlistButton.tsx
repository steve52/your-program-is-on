import { addUnsavedMovieToWatchlist, toggleWatchlist } from "@/actions/actions";
import { Movie } from "@prisma/client";
import styles from "./watchlistbutton.module.css";
import { UnsavedMovie } from "@/types/types";
import { isSavedMovie } from "@/utils";

type WatchlistButtonProps = {
  movie: Movie | UnsavedMovie;
};

const handleToggleWatchlist = async (movie: Movie | UnsavedMovie) => {
  if (isSavedMovie(movie)) {
    await toggleWatchlist(movie);
  } else {
    await addUnsavedMovieToWatchlist(movie);
  }
};

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movie }) => {
  return (
    <>
      {movie.watchlist ? (
        <button
          className={styles.button}
          onClick={() => handleToggleWatchlist(movie)}
        >
          <img src="./remove.svg" alt="Remove from Watchlist" />
        </button>
      ) : (
        <button
          className={styles.button}
          onClick={() => handleToggleWatchlist(movie)}
        >
          <img src="./add.svg" alt="Add from Watchlist" />
        </button>
      )}
    </>
  );
};

export default WatchlistButton;
