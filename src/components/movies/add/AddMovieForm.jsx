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
    });
    router.push("/movies");
  };

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <MovieForm onSubmit={handleSubmit} />
    </div>
  );
};

export { AddMovieForm };
