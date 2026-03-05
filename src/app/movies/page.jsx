"use client";

import {
  fetchAllCategoriesAction,
  fetchMovieAction,
  switchCategoryAction,
} from "@/action/movieAction";
import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const SORT_ITEM = [
  { key: "popularity", label: "Popularity" },
  { key: "vote_average", label: "Rating" },
  { key: "release_date", label: "Release Date" },
];

const selectCls =
  "bg-cinema-700 border border-cinema-500 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-400/40 transition-all cursor-pointer";

const MoviesPage = () => {
  const { isLoading, isCategoryLoading, genres, error, isFetched } =
    useMovieStore();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("desc");
  const params = useSearchParams();
  const category = params.get("category") || "";

  const hasFilters = debouncedSearch || filter || sort;

  // Fetch semua kategori sekali saat pertama load
  useEffect(() => {
    fetchAllCategoriesAction();
  }, []);

  // Klik sidebar → switch dari store, no API
  useEffect(() => {
    if (!isFetched) return;
    if (hasFilters) return; // kalau ada filter aktif, biarkan hasil filter tetap
    switchCategoryAction(category || "popular");
  }, [category, isFetched]);

  // Search/sort/filter berubah → fetch API
  useEffect(() => {
    if (!isFetched) return;
    if (!hasFilters) {
      // Filter di-clear, balik ke kategori dari store
      switchCategoryAction(category || "popular");
      return;
    }
    fetchMovieAction({
      page: 1,
      search: debouncedSearch,
      genre: filter,
      sort,
      order,
      category,
    });
  }, [debouncedSearch, filter, sort, order]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded bg-red-500/10 flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6 text-red-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-red-400 font-medium">Error loading movies</p>
        <p className="text-muted-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  const showLoading = isLoading || isCategoryLoading;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="w-full bg-cinema-700 border border-cinema-500 text-white text-sm rounded-xl pl-10 pr-4 py-2 placeholder-cinema-400 focus:outline-none focus:ring-2 focus:ring-accent-400/40 focus:border-accent-400/40 transition-all"
            placeholder="Search movies..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          className={selectCls}
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

        <select
          className={selectCls}
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="">Sort by...</option>
          {SORT_ITEM.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>

        <select
          className={selectCls}
          onChange={(e) => setOrder(e.target.value)}
          value={order}
        >
          <option value="asc">↑ Asc</option>
          <option value="desc">↓ Desc</option>
        </select>

        <Link
          href="/movies/add"
          className="flex items-center gap-2 px-4 py-2 rounded bg-accent-500 hover:bg-accent-400 text-white text-sm font-semibold transition-all duration-200 active:scale-[0.97] whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Movie
        </Link>
      </div>

      {showLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded bg-cinema-700 border border-cinema-600 animate-pulse"
            >
              <div className="aspect-[2/3]" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-cinema-600 rounded" />
                <div className="h-2 bg-cinema-600/50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MovieList />
      )}

      <Pagination
        search={debouncedSearch}
        filter={filter}
        sort={sort}
        order={order}
      />
    </div>
  );
};

export default MoviesPage;
