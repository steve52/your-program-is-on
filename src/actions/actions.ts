'use server';

import prisma from "@/lib/prisma";
import { MovieAPI } from "@/types/types";
import { Movie } from "@prisma/client";

const convertToMovieModel = (movie: MovieAPI): Omit<Movie, 'id'> => {
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

export async function addMovie(movie: MovieAPI, data: Partial<Movie>) {
  console.log('~~ add movie', movie)
  const newMovie = convertToMovieModel(movie)
  return prisma.movie.create({
    data: {...newMovie, ...data}
  })
}

// Search for movies usimg hte OMDB API
export async function search(searchTerm: string): Promise<MovieAPI[]> {
  const url = `http://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}&plot=short`;

  const response = await fetch(url)

  const res = await response.json()

  const searchResults: MovieAPI[]  = res.Search || [];

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