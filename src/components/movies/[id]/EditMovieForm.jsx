"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";

const EditMovieForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const { movies, updateMovie } = useMovieStore();

  const movie = movies.find((item) => item.id === Number(id));

  const [title, setTitle] = useState(movie?.title || "");
  const [overview, setOverview] = useState(movie?.overview || "");
  const [voteAverage, setVoteAverage] = useState(movie?.vote_average || "");

  if (!movie) return <p>Movie not found</p>;

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required");
    updateMovie(movie.id, {
      title,
      overview,
      vote_average: Number(voteAverage),
    });
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>

      <div>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label>Overview</label>
        <textarea
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={voteAverage}
          onChange={(e) => setVoteAverage(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export { EditMovieForm };
