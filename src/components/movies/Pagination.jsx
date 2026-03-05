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
    <div>
      <button onClick={handlePrev} disabled={page <= 1}>
        Prev
      </button>
      <p>
        {page} / {totalPage}
      </p>
      <button onClick={handleNext} disabled={page >= totalPage}>
        Next
      </button>
    </div>
  );
};

export { Pagination };
