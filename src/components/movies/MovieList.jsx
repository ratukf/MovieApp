"use client";

import { MovieCard } from "@/components/movies/MovieCard";
import { useMovieStore } from "@/store/movieStore";

const MovieList = () => {
  const { movies } = useMovieStore();
  return (
    <div>
      <h4>MovieList</h4>
      {movies.map((item) => (
        <MovieCard
          id={item.id}
          key={item.id}
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
