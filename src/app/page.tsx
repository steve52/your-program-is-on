import styles from "./page.module.css";
import prisma from "../lib/prisma";
import MovieList from "./components/MovieList/MovieList";
import { getAllWatchlistMovies } from "@/actions/actions";
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
