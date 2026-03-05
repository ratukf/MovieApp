"use client";

import { useMovieStore } from "@/store/movieStore";
import { fetchMovieAction } from "@/action/movieAction";

const Pagination = ({ search, filter, sort, order }) => {
  const { page, totalPage } = useMovieStore();

  const handlePrev = () => {
    if (page > 1)
      fetchMovieAction({ page: page - 1, search, filter, sort, order });
  };

  const handleNext = () => {
    if (page < totalPage)
      fetchMovieAction({ page: page + 1, search, filter, sort, order });
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8 py-4">
      <button
        onClick={handlePrev}
        disabled={page <= 1}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-700 border borde-cinema-500 text-sm font-medium text-white hover:bg-cinema-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Prev
      </button>

      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-lg bg-accent-500/10 border border-yellow-400/20 text-accent-400 text-sm font-bold">
          {page}
        </span>
        <span className="text-muted-400 text-sm">/</span>
        <span className="text-sm text-muted-400">{totalPage}</span>
      </div>

      <button
        onClick={handleNext}
        disabled={page >= totalPage}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cinema-700 border borde-cinema-500 text-sm font-medium text-white hover:bg-cinema-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export { Pagination };
