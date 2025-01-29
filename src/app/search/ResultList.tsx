import { OMDBMovie } from "@/types/types";
import { search } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { convertToMovieModel } from "@/utils";
import MovieList from "../components/MovieList/MovieList";

type ResultProps = {
  title?: string;
  savedMovies: Movie[];
};

const ResultList: React.FC<ResultProps> = async ({ savedMovies, title }) => {
  let searchResults: OMDBMovie[] = [];
  if (title) {
    searchResults = [];
    searchResults = await search(title);
  }

  const movies = searchResults.map((movieResult) => {
    const savedMovie = savedMovies.find((m) => m.imdbID === movieResult.imdbID);
    const movie = savedMovie ? savedMovie : convertToMovieModel(movieResult);
    return movie;
  });

  return (
    <>
      {title &&
        !searchResults.length &&
        "Sorry there are no matching search results."}
      <MovieList movies={movies} isWatchList={false} />
    </>
  );
};

export default ResultList;
