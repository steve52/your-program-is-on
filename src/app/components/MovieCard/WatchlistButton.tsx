"use client";
import { updateMovie } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { useRouter } from "next/navigation";

type WatchlistButtonProps = {
  movie: Movie;
};

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movie }) => {
  const router = useRouter();

  const toggleWatchlist = () => {
    updateMovie(movie, { watchlist: !movie.watchlist });
    router.refresh();
  };

  return (
    <>
      {movie.watchlist ? (
        <button onClick={toggleWatchlist}>Remove from watchlist</button>
      ) : (
        <button onClick={toggleWatchlist}>Add to watchlist</button>
      )}
    </>
  );
};

export default WatchlistButton;
