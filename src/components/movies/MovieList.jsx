"use client";

import { MovieCard } from "@/components/movies/MovieCard";
import { useMovieStore } from "@/store/movieStore";

const MovieList = ({ search, filter }) => {
  const { movies } = useMovieStore();

  const filtered = movies
    .filter((m) => m.title.toLowerCase().includes((search || "").toLowerCase()))
    .filter((m) => (filter ? m.genre_ids.includes(filter) : true));

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
