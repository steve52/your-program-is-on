import { Movie } from "@prisma/client";
import { OMDBMovie, UnsavedMovie } from "./types/types";

/**
 * Converts a movie returned from the OMDB API to a model for saving
 * in my database
 *
 * @param {OMDBMovie} movie
 * @returns {UnsavedMovie}
 */
export const convertToMovieModel = (movie: OMDBMovie): Movie | UnsavedMovie => {
  const ratingObj = movie.Ratings.find((m) => m.Source === "Rotten Tomatoes");
  const rottenRating = ratingObj ? ratingObj.Value : "N/A";

  return {
    title: movie.Title,
    year: movie.Year,
    rated: movie.Rated,
    released: movie.Released,
    runtime: movie.Runtime,
    genre: movie.Genre,
    director: movie.Director,
    writer: movie.Writer,
    actors: movie.Actors,
    plot: movie.Plot,
    language: movie.Language,
    country: movie.Country,
    awards: movie.Awards,
    poster: movie.Poster,
    imdbRating: movie.imdbRating,
    imdbVotes: movie.imdbVotes,
    imdbID: movie.imdbID,
    rottenRating: rottenRating,
    metascore: movie.Metascore,
    userRating: null,
    watched: false,
    watchListOrder: null,
    watchlist: false,
  };
};
