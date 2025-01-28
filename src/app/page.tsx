import { getAllWatchlistMovies } from "@/actions/actions";
import MovieList from "./components/MovieList/MovieList";
import { Suspense } from "react";

const WatchlistMovieList = async () => {
  const movies = await getAllWatchlistMovies();
  return <MovieList movies={movies} isWatchList={true} />;
};

const Home = () => {
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <WatchlistMovieList />
      </Suspense>
    </main>
  );
};

export default Home;
