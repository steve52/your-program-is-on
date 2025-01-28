import { Suspense } from "react";
import MovieList from "../components/MovieList/MovieList";
import { getAllSavedMovies } from "@/actions/actions";

const SavedMovieList = async () => {
  const movies = await getAllSavedMovies();
  return <MovieList movies={movies} isWatchList={false} />;
};

export default async function Page() {
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <SavedMovieList />
      </Suspense>
    </main>
  );
}
