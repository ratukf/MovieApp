"use client";

import { fetchMovieAction } from "@/action/movieAction";
import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const { isLoading, error, isFetched } = useMovieStore();
  const [search, setSearch] = useState();

  useEffect(() => {
    if (!isFetched) {
      fetchMovieAction();
    }
  }, []);
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <main>
      <Link href="/movies/add">Add Movie</Link>
      <Link href="/bookmarks">Bookmarks</Link>
      <input onChange={(e) => setSearch(e.target.value)} value={search} />
      {isLoading ? <p>Loading ...</p> : <MovieList search={search} />}
      <Pagination />
    </main>
  );
};

export default MoviesPage;
