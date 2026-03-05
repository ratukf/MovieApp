"use client";

import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";
import { MovieForm } from "@/components/movies/MovieForm";

const AddMovieForm = () => {
  const router = useRouter();
  const { addMovie } = useMovieStore();

  const handleSubmit = (values) => {
    addMovie({
      ...values,
      id: Date.now(),
      vote_average: Number(values.vote_average),
      poster_path: "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png",
      backdrop_path: null,
      release_date: new Date().toISOString().split("T")[0],
    });
    router.back();
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
        <h2 className="text-lg font-semibold text-white mb-6">New Movie</h2>
        <MovieForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export { AddMovieForm };
