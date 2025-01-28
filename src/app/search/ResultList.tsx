import { OMDBMovie } from "@/types/types";
import { search } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { convertToMovieModel } from "@/utils";
import MovieCard from "../components/MovieCard/MovieCard";

type ResultProps = {
  title?: string;
  savedMovies: Movie[];
};

const ResultList: React.FC<ResultProps> = async ({ savedMovies, title }) => {
  let searchResults: OMDBMovie[] = [];
  if (title) {
    searchResults = []
    searchResults = await search(title);
  }

  return (
    <>
      {searchResults.map((movieResult, index) => {
        const savedMovie = savedMovies.find(
          (m) => m.imdbID === movieResult.imdbID
        );
        const movie = savedMovie
          ? savedMovie
          : convertToMovieModel(movieResult);

        return <MovieCard movie={movie} index={index} key={movie.imdbID} />;
      })}
    </>
  );
};

export default ResultList;
