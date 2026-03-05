"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMovieStore } from "@/store/movieStore";

const MovieDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { movies, genres, bookmarks, toggleBookmark, deleteMovie } =
    useMovieStore();

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

  const isBookmarked = bookmarks.includes(movie.id);
  const year = movie.release_date?.split("-")[0];
  const genreNames = movie.genre_ids
    .map((gid) => genres.find((g) => g.id === gid)?.name)
    .filter(Boolean);

  const ratingColor =
    movie.vote_average >= 8
      ? "text-emerald-400"
      : movie.vote_average >= 6
        ? "text-accent-400"
        : "text-red-400";

  const handleDelete = () => {
    deleteMovie(movie.id);
    router.back();
  };

  return (
    <div className="max-w-4xl">
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

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0">
          <div className="relative w-48 sm:w-56 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-[2/3] bg-cinema-700 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-slate-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-muted-500 text-sm">{year}</span>
            <span className="text-slate-700">•</span>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className={`font-bold ${ratingColor}`}>
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="text-muted-500 text-xs">
                ({movie.vote_count?.toLocaleString()} votes)
              </span>
            </div>
          </div>

          {/* Genres */}
          {genreNames.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {genreNames.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 rounded-full bg-cinema-700 border borde-cinema-500 text-sm text-white"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          <p className="text-muted-400 text-sm leading-relaxed mb-6">
            {movie.overview}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleBookmark(movie.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                isBookmarked
                  ? "bg-accent-500/10 border-yellow-400/30 text-accent-400 hover:bg-accent-500/20"
                  : "bg-cinema-700 borde-cinema-500 text-white hover:bg-cinema-600 hover:text-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={isBookmarked ? 0 : 2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>

            <Link
              href={`/movies/${movie.id}/edit`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-cinema-700 border borde-cinema-500 text-white hover:bg-cinema-600 hover:text-white transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-400/40 transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieDetail };
