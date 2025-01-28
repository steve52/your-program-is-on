import { OMDBMovie } from "@/types/types";
import Image from "next/image";
import styles from "./page.module.css";
import { addMovie, getAllSavedMovies, updateMovie } from "@/actions/actions";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";
import { convertToMovieModel } from "@/utils";
import MovieCard from "../components/MovieCard/MovieCard";

type ResultProps = {
  results: OMDBMovie[];
};

const ResultList: React.FC<ResultProps> = ({ results }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await getAllSavedMovies();
      setSavedMovies(movies);
    };
    getMovies();
  }, []);

  return (
    <>
      {results.map((movieResult, index) => {
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
