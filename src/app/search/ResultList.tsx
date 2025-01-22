import { OMDBMovie } from "@/types/types";
import Image from "next/image";
import styles from "./page.module.css";
import { addMovie, getAllSavedMovies, updateMovie } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

type ResultProps = {
  results: OMDBMovie[];
};

const ResultList: React.FC<ResultProps> = ({ results }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await getAllSavedMovies();
      setSavedMovies(movies);
    };
    getMovies();
  }, []);

  const toggleWatchlist = async (savedMovie: Movie) => {
    const updatedMovie = await updateMovie(savedMovie, {
      watchlist: !savedMovie.watchlist,
    });
    const newSavedMovies = savedMovies.map((m) => {
      if (m.id === updatedMovie.id) return updatedMovie;
      else return m;
    });
    setSavedMovies(newSavedMovies);
  };

  const addToWatchlist = async (movie: OMDBMovie, savedMovie?: Movie) => {
    if (savedMovie) {
      toggleWatchlist(savedMovie)
    } else {
      const newMovie = await addMovie(movie, { watchlist: true });
      setSavedMovies(savedMovies.concat(newMovie));
    }
  };

  const removeFromWatchlist = async (savedMovie: Movie) => {
    toggleWatchlist(savedMovie)
  };

  return (
    <>
      {results.map((movie, index) => {
        const savedMovie = savedMovies.find((m) => m.imdbID === movie.imdbID);

        return (
          <div className={styles.card} key={movie.imdbID}>
            {index}
            {movie.Poster.includes("http") && (
              <Image
                src={movie.Poster}
                alt=""
                width="75"
                height="111"
                className={styles.poster}
              />
            )}
            <div>
              <div className={styles.title}>
                {movie.Title} ({movie.Year})
              </div>

              <div className={styles.subHeader}>
                {movie.Runtime} {movie.Genre}
              </div>
              <p className={styles.plot}>{movie.Plot}</p>
              <div className={styles.ratings}>
                🍅 {} 🟨 {movie.imdbRating}/10
              </div>

              <button>Rate</button>

              {savedMovie && savedMovie.watchlist ? (
                <button onClick={() => removeFromWatchlist(savedMovie)}>
                  Remove from watchlist
                </button>
              ) : (
                <button onClick={() => addToWatchlist(movie, savedMovie)}>
                  Add to watchlist
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ResultList;
