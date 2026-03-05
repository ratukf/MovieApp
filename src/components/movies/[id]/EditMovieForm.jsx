"use client";

import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import { MovieForm } from "@/components/movies/MovieForm";

const EditMovieForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { movies, updateMovie } = useMovieStore();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) return <p>Movie not found</p>;

  const handleSubmit = (values) => {
    updateMovie(movie.id, {
      ...values,
      vote_average: Number(values.vote_average),
    });
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <MovieForm
        initialValues={{
          title: movie.title,
          overview: movie.overview,
          vote_average: movie.vote_average,
          genre_ids: movie.genre_ids,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export { EditMovieForm };
