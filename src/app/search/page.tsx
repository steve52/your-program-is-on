'use client'

import { search } from "@/actions/actions";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import ResultList from "./ResultList";
import { MovieAPI } from "@/types/types";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<MovieAPI[]>([]);


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = await search(searchTerm);
    setSearchResults(data);
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div>SEARCH</div>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleInputChange} />
        <button>Submit</button>
      </form>
      <ResultList results={searchResults} />
    </>
  );
}
