"use client";

import { useMovieStore } from "@/store/movieStore";
import Image from "next/image";
import Link from "next/link";

const RecentMovies = () => {
  const { movies } = useMovieStore();
  const recent = movies.slice(0, 5);

  if (!recent.length) {
    return (
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-muted-500 uppercase tracking-widest mb-4">
          Recent Movies
        </h2>
        <div className="rounded-2xl bg-cinema-800 border borde-cinema-600 p-8 text-center">
          <p className="text-muted-500 text-sm">
            Browse movies to see them here
          </p>
          <Link
            href="/movies"
            className="mt-3 inline-block text-sm text-accent-400 hover:underline"
          >
            Go to Movies →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-muted-500 uppercase tracking-widest">
          Recent Movies
        </h2>
        <Link
          href="/movies"
          className="text-xs text-accent-400 hover:text-yellow-300 transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="rounded-2xl bg-cinema-800 border borde-cinema-600 divide-y divide-white/5 overflow-hidden">
        {recent.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="flex items-center gap-4 px-4 py-3 hover:bg-cinema-700 transition-colors group"
          >
            <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-cinema-700">
              {movie.poster_path && (
                <Image
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  width={40}
                  height={56}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate group-hover:text-accent-400 transition-colors">
                {movie.title}
              </p>
              <p className="text-xs text-muted-500">
                {movie.release_date?.split("-")[0]}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg
                className="w-3 h-3 text-accent-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-accent-400 font-medium">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { RecentMovies };
