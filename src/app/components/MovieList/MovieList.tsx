import styles from "./movieList.module.css";
import { getAllWatchlistMovies } from "@/actions/actions";
import MovieCard from "../MovieCard/MovieCard";

const MovieList: React.FC = async () => {
  const movies = await getAllWatchlistMovies();

  return (
    <div className={styles.movielist}>
      {movies.map((movie, i) => {
        return <MovieCard key={movie.imdbID} movie={movie} index={i} isWatchList={true} />;
      })}
    </div>
  );
};

export default MovieList;
