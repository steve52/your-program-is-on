'use server';

import prisma from "@/lib/prisma";
import { OMDBMovie } from "@/types/types";
import { Movie } from "@prisma/client";

const convertToMovieModel = (movie: OMDBMovie): Omit<Movie, 'id'> => {
  const ratingObj = movie.Ratings.find(m => m.Source === 'Rotten Tomatoes');
  const rottenRating = ratingObj ? ratingObj.Value : 'N/A';
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
    watchlist: false
  }
}

export async function getAllWatchlistMovies() {
  return await prisma.movie.findMany({
    where: {
      watchlist: true,
    },
    orderBy: {
      watchListOrder: 'asc'
    }
  });
}

export async function getAllSavedMovies() {
  return await prisma.movie.findMany();
}

export async function updateMovie(movie: Movie, data: Partial<Movie>) {
  console.log('~~ update movie', movie, data)
  return await prisma.movie.update({
    where: {
      id: movie.id
    },
    data: data
  })
}

export async function addMovie(movie: OMDBMovie, data: Partial<Movie>) {
  console.log('~~ add movie', movie)
  const newMovie = convertToMovieModel(movie)
  return prisma.movie.create({
    data: {...newMovie, ...data}
  })
}


export async function moveUpWatchList(movie: Movie) {
  if (!movie.watchListOrder) {
    console.error("There was an error updating movie. No current watchListOrder was found.")
    return;
  }

  const movies = await getAllWatchlistMovies();
  if (movies) {
    const movieIndex = movies.findIndex(m => m.id === movie.id);
    if (movieIndex === 0) {
      console.warn("Already highest ranked movie.");
      return;
    }
    const higherMovie = movies[movieIndex - 1];
    const oldRank = movie.watchListOrder;
    const newRank = higherMovie.watchListOrder;
    return await prisma.$transaction([
      prisma.movie.update({
        where: {
          id: movie.id
        },
        data: {watchListOrder: null}
      }),
      prisma.movie.update({
        where: {
          id: higherMovie.id
        },
        data: {watchListOrder: oldRank}
      }),
      prisma.movie.update({
        where: {
          id: movie.id
        },
        data: {watchListOrder: newRank}
      })
    ])
  } else {
    console.error("There was an error fetching watchlist movies")
  }
}

export async function moveDownWatchList(movie: Movie) {
  if (!movie.watchListOrder) {
    console.error("There was an error updating movie. No current watchListOrder was found.")
    return;
  }

  const movies = await getAllWatchlistMovies();
  if (movies) {
    const movieIndex = movies.findIndex(m => m.id === movie.id);
    if (movieIndex === movies.length - 1) {
      console.warn("Already lowest ranked movie.");
      return;
    }
    const lowerMovie = movies[movieIndex + 1];
    const oldRank = movie.watchListOrder;
    const newRank = lowerMovie.watchListOrder;
    return await prisma.$transaction([
      prisma.movie.update({
        where: {
          id: movie.id
        },
        data: {watchListOrder: null}
      }),
      prisma.movie.update({
        where: {
          id: lowerMovie.id
        },
        data: {watchListOrder: oldRank}
      }),
      prisma.movie.update({
        where: {
          id: movie.id
        },
        data: {watchListOrder: newRank}
      })
    ])
  } else {
    console.error("There was an error fetching watchlist movies")
  }
}

export async function updateMovieOrder(movie: Movie, newOrder: number) {

}

export async function toggleWatchlist(movie: Movie) {
  if (movie.watchlist) {
    removeMovieFromWatchlist(movie)
  } else {
    addMovieToWatchlist(movie);
  }
}



export async function addMovieToWatchlist(movie: Movie) {
  const movies = await getAllWatchlistMovies();
  if (movies) {
    const lastMovie = movies[movies.length - 1];
    const lastMovieRank = lastMovie.watchListOrder;
    if (lastMovieRank) {
      return updateMovie(movie, {watchlist: true, watchListOrder: lastMovieRank + 1});
    } else {
      console.error(`Couldn't update movie. Missing watchListOrder field on movie with id:${lastMovie.id}`)
    }
  } else {
    return updateMovie(movie, {watchlist: true, watchListOrder: 1});
  }
}

export async function removeMovieFromWatchlist(movie: Movie) {
  return updateMovie(movie, {watchlist: false, watchListOrder: null});
}


// Search for movies usimg hte OMDB API
export async function search(searchTerm: string): Promise<OMDBMovie[]> {
  const url = `http://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}&plot=full`;

  const response = await fetch(url)

  const res = await response.json()

  const searchResults: OMDBMovie[]  = res.Search || [];

  const moviePromises = searchResults.map(async (movie) => {
    const baseUrl = 'https://www.omdbapi.com';
    const queryString = `?apikey=${process.env.OMDB_API_KEY}&r=json&i=${movie.imdbID}&plot=short`;
    const url = baseUrl + queryString;
    const res = await fetch(url)
    return await res.json()
    // let ratingObj = data.Ratings.find(d => d.Source === 'Rotten Tomatoes');
    // let rottenRating = ratingObj ? ratingObj.Value : 'N/A';
  })

  return await Promise.all(moviePromises)
}