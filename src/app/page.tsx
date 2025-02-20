import MovieList from "./components/MovieList/MovieList";
import { Suspense, } from "react";
import { getAllWatchlistMovies } from "@/actions/actions";

const Home = async () => {
  const movies = await getAllWatchlistMovies();
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <MovieList movies={movies} isWatchList={true} />
      </Suspense>
    </main>
  );
};

export default Home;
