'use client'

import { search } from "@/actions/actions";
import { useEffect, useState } from "react";
import ResultList from "./ResultList";
import { OMDBMovie } from "@/types/types";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<OMDBMovie[]>([]);
  const searchParams = useSearchParams();

  const title = searchParams.get('title')
  useEffect(() => {
    const searchOMDBMovie = async () => {
      if (title) {
        setIsLoading(true);
        const data = await search(title);
        setIsLoading(false);
        setSearchResults(data);
      }
    }
    searchOMDBMovie();
  }, [title]);


  return (
    <>
      {isLoading && "Loading Results..."}
      <ResultList results={searchResults} />
    </>
  );
}
