import MovieList from "./components/MovieList/MovieList";
import { Suspense } from "react";

const Home = () => {
  return (
    <main>
      <Suspense fallback={null}>
        <MovieList />
      </Suspense>
    </main>
  );
};

export default Home;
