'use client'

import { search } from "@/actions/actions";
import { useEffect, useState } from "react";
import ResultList from "./ResultList";
import { MovieAPI } from "@/types/types";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<MovieAPI[]>([]);
  const searchParams = useSearchParams();

  const title = searchParams.get('title')
  useEffect(() => {
    const searchMovieAPI = async () => {
      if (title) {
        setIsLoading(true);
        const data = await search(title);
        setIsLoading(false);
        setSearchResults(data);
      }
    }
    searchMovieAPI();
  }, [title]);


  return (
    <>
      {isLoading && "Loading Results..."}
      <ResultList results={searchResults} />
    </>
  );
}
