"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";

const MovieDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { movies, genres, deleteMovie } = useMovieStore();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) return <p>Movie not found</p>;

  const year = movie.release_date?.split("-")[0];

  const handleDelete = () => {
    deleteMovie(movie.id);
    router.push("/movies");
  };

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>

      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
      />

      <p>{movie.title}</p>
      <p>{year}</p>
      <p>
        {movie.vote_average} ({movie.vote_count} votes)
      </p>
      <p>{movie.overview}</p>

      <div>
        {movie.genre_ids.map((genreId, index) => (
          <span key={genreId}>
            {genres.find((g) => g.id === genreId)?.name}
            {index < movie.genre_ids.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>

      <Link href={`/movies/${movie.id}/edit`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export { MovieDetail };
