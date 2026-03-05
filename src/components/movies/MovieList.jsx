"use client";

import { MovieCard } from "@/components/movies/MovieCard";
import { useMovieStore } from "@/store/movieStore";

const MovieList = ({ search, filter, sort, order }) => {
  const { movies } = useMovieStore();

  const filtered = movies
    .filter((m) => m.title.toLowerCase().includes((search || "").toLowerCase()))
    .filter((m) => (filter ? m.genre_ids.includes(filter) : true))
    .sort((a, b) => {
      if (!sort) return 0;

      let valA = a[sort];
      let valB = b[sort];

      if (sort === "year") {
        valA = a.release_date?.split("-")[0];
        valB = b.release_date?.split("-")[0];
      }

      if (valA < valB) return order === "desc" ? 1 : -1;
      if (valA > valB) return order === "desc" ? -1 : 1;
      return 0;
    });

  if (!filtered.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cinema-700 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </div>
        <p className="text-muted-400 font-medium">No movies found</p>
        <p className="text-muted-400 text-sm mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filtered.map((item) => (
        <MovieCard
          key={item.id}
          id={item.id}
          poster_path={item.poster_path}
          title={item.title}
          release_date={item.release_date}
          vote_average={item.vote_average}
          genre_ids={item.genre_ids}
        />
      ))}
    </div>
  );
};

export { MovieList };
