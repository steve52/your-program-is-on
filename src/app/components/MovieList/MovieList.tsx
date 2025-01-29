import styles from "./movieList.module.css";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "@prisma/client";
import { UnsavedMovie } from "@/types/types";

type MovieListProps = {
  movies: (Movie | UnsavedMovie)[];
  isWatchList: boolean;
};

const MovieList: React.FC<MovieListProps> = async ({ movies, isWatchList }) => {
  return (
    <div className={styles.movielist}>
      {movies.map((movie, i) => {
        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            index={i}
            isWatchList={isWatchList}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
