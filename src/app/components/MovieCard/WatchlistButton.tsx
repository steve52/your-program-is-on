"use client";
import { addUnsavedMovieToWatchlist, toggleWatchlist } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";
import styles from "./watchlistbutton.module.css";
import { UnsavedMovie } from "@/types/types";
import { isSavedMovie } from "@/utils";

type WatchlistButtonProps = {
  movie: Movie | UnsavedMovie;
};

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movie }) => {
  const router = useRouter();

  const handleToggleWatchlist = async () => {
    if (isSavedMovie(movie)) {
      await toggleWatchlist(movie);
    } else {
      await addUnsavedMovieToWatchlist(movie);
    }
    router.refresh();
  };

  return (
    <>
      {movie.watchlist ? (
        <button className={styles.button} onClick={handleToggleWatchlist}>
          <img src="./remove.svg" alt="Remove from Watchlist"/>
        </button>
      ) : (
        <button className={styles.button} onClick={handleToggleWatchlist}>
          <img src="./add.svg"  alt="Add from Watchlist"/>
        </button>
      )}
    </>
  );
};

export default WatchlistButton;
