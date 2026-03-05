"use client";

import { fetchMovieAction } from "@/action/movieAction";
import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { useEffect, useState } from "react";

const MoviesPage = () => {
  const { isLoading, genres, error, isFetched } = useMovieStore();
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState("");

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
      <p>Filter Genres</p>
      <select
        onChange={(e) => setFilter(Number(e.target.value))}
        value={filter}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <MovieList search={search} filter={filter} />
      )}
      <Pagination />
    </main>
  );
};

export default MoviesPage;
