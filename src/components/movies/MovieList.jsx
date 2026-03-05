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

  return (
    <div>
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
