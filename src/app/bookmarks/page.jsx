"use client";

import { MovieCard } from "@/components/movies/MovieCard";
import { useMovieStore } from "@/store/movieStore";
import Link from "next/link";

const BookmarksPage = () => {
  const { movies, bookmarks } = useMovieStore();
  const bookmark = movies.filter((item) => bookmarks.includes(item.id));

  if (!bookmark.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-cinema-700 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-muted-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        </div>
        <p className="text-white font-medium mb-1">No bookmarks yet</p>
        <p className="text-muted-400 text-sm mb-4">
          Save movies you love to find them here
        </p>
        <Link
          href="/movies"
          className="px-4 py-2 rounded-xl bg-accent-500 hover:bg-accent-400 text-black text-sm font-semibold transition-all duration-200"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted-500 mb-6">
        {bookmark.length} saved movie{bookmark.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bookmark.map((item) => (
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
    </div>
  );
};

export default BookmarksPage;
