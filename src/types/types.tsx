import { Movie } from "@prisma/client"

export type OMDBMovie = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Ratings: {Source: string, Value: string}[]
  Metascore: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export type UnsavedMovie = Omit<Movie, "id">