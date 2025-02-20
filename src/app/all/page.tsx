import { Suspense } from "react";
import MovieList from "../components/MovieList/MovieList";
import { getAllSavedMovies } from "@/actions/actions";

export default async function Page() {
  const movies = await getAllSavedMovies();
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <MovieList movies={movies} isWatchList={false} />
      </Suspense>
    </main>
  );
}
