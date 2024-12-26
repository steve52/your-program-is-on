import MovieList from "./components/MovieList/MovieList";
import { Suspense } from "react";
import styles from "./page.module.css";
const Home = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={"Sorry there are not movies"}>
        <MovieList />
      </Suspense>
    </main>
  );
};

export default Home;
