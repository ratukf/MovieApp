"use client";

import { fetchMovieAction } from "@/action/movieAction";
import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";
import { useMovieStore } from "@/store/movieStore";
import { useEffect } from "react";

const MoviesPage = () => {
  const { isLoading, error, isFetched } = useMovieStore();
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
      {isLoading ? <p>Loading ...</p> : <MovieList />}
      <Pagination />
    </main>
  );
};

export default MoviesPage;
