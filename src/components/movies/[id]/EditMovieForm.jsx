"use client";

import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import { MovieForm } from "@/components/movies/MovieForm";

const EditMovieForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { movies, updateMovie } = useMovieStore();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-400">Movie not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 text-sm text-accent-400 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );

  const handleSubmit = (values) => {
    updateMovie(movie.id, {
      ...values,
      vote_average: Number(values.vote_average),
    });
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className="max-w-xl">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-muted-400 hover:text-white mb-6 transition-colors group"
      >
        <svg
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
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
        Back
      </button>

      <div className="rounded-2xl bg-cinema-800 border borde-cinema-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-1">Edit Movie</h2>
        <p className="text-sm text-muted-500 mb-6">{movie.title}</p>
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
    </div>
  );
};

export { EditMovieForm };
