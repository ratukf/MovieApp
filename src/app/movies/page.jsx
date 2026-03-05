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

const selectCls =
  "bg-[#1a1a24] border border-white/10 text-slate-300 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition-all cursor-pointer";

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
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-red-400 font-medium">Error loading movies</p>
        <p className="text-slate-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="w-full bg-[#1a1a24] border border-white/10 text-slate-200 text-sm rounded-xl pl-10 pr-4 py-2 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400/40 transition-all"
            placeholder="Search movies..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/* Genre Filter */}
        <select className={selectCls} onChange={(e) => setFilter(Number(e.target.value))} value={filter}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select className={selectCls} onChange={(e) => setsort(e.target.value)} value={sort}>
          <option value="">Sort by...</option>
          {SORT_ITEM.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Order */}
        <select className={selectCls} onChange={(e) => setOrder(e.target.value)} value={order}>
          <option value="asc">↑ Asc</option>
          <option value="desc">↓ Desc</option>
        </select>

        {/* Add Movie */}
        <Link
          href="/movies/add"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-semibold transition-all duration-200 shadow-lg shadow-yellow-400/10 active:scale-[0.97] whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Movie
        </Link>
      </div>

      {/* Movie Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-white/5 border border-white/5 animate-pulse">
              <div className="aspect-[2/3]" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-white/10 rounded" />
                <div className="h-2 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MovieList search={debouncedSearch} filter={filter} sort={sort} order={order} />
      )}

      <Pagination search={debouncedSearch} filter={filter} sort={sort} order={order} />
    </div>
  );
};

export default MoviesPage;
