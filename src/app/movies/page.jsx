"use client";

import { fetchMovieAction } from "@/action/movieAction";
import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SORT_ITEM = [
  { key: "popularity", label: "Popularity" },
  { key: "vote_average", label: "Rating" },
  { key: "release_date", label: "Release Date" },
];

const MoviesPage = () => {
  const { isLoading, genres, error, isFetched } = useMovieStore();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [filter, setFilter] = useState("");
  const [sort, setsort] = useState("");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetchMovieAction({
      page: 1,
      search: debouncedSearch,
      genre: filter,
      sort,
      order,
    });
  }, [debouncedSearch, filter, sort, order]);

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
      <div>
        <p>Sort</p>
        <select onChange={(e) => setsort(e.target.value)} value={sort}>
          <option value="">-no sort-</option>
          {SORT_ITEM.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        <p>Sort order</p>
        <select onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {isLoading ? <p>Loading ...</p> : <MovieList />}
      <Pagination search={search} filter={filter} sort={sort} order={order} />
    </main>
  );
};

export default MoviesPage;
