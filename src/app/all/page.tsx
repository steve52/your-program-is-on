import MovieCard from "../components/MovieCard/MovieCard";
import styles from "./page.module.css";
import { getAllSavedMovies } from "@/actions/actions";

export default async function Page() {
  const movies = await getAllSavedMovies();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.movielist}>
          {movies
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, 10)
            .map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
        </div>
      </main>
    </div>
  );
}
