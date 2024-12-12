import Image from "next/image";
import { Movie } from "@prisma/client";
import styles from "./movieList.module.css";
import { getAllWatchlistMovies, updateMovie } from "@/actions/actions";
import MovieCard from "../MovieCard/MovieCard";

const MovieList: React.FC = async () => {
  const movies = await getAllWatchlistMovies();
  console.log('~~~ movies', movies);
  return (
    <div className={styles.movielist}>
      {movies.slice(0, 10).map((movie, i) => {
        return <MovieCard key={movie.imdbID} movie={movie} index={i} />;
      })}
    </div>
  );
};

export default MovieList;
