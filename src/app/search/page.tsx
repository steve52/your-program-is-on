import { getAllSavedMovies } from "@/actions/actions";
import ResultList from "./ResultList";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const savedMovies = await getAllSavedMovies();

  return (
    <Suspense key={params.title} fallback="Loading...">
      <ResultList savedMovies={savedMovies} title={params.title} />
    </Suspense>
  );
}
