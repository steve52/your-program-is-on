"use client";
import { toggleWatchlist } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";
import styles from "./watchlistbutton.module.css";

type WatchlistButtonProps = {
  movie: Movie;
};

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movie }) => {
  const router = useRouter();

  const handleToggleWatchlist = async () => {
    await toggleWatchlist(movie);
    router.refresh();
  };

  return (
    <>
      {movie.watchlist ? (
        <button className={styles.button} onClick={handleToggleWatchlist}>
          <img src="./remove.svg" />
        </button>
      ) : (
        <button className={styles.button} onClick={handleToggleWatchlist}>
          <img src="./add.svg" />
        </button>
      )}
    </>
  );
};

export default WatchlistButton;
