import { useMovieStore } from "@/store/movieStore";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({
  id,
  poster_path,
  title,
  release_date,
  vote_average,
  genre_ids,
}) => {
  const year = release_date?.split("-")[0];
  const { genres } = useMovieStore();

  const genreNames = genre_ids
    ?.slice(0, 2)
    .map((gid) => genres.find((g) => g.id === gid)?.name)
    .filter(Boolean);

  const ratingColor =
    vote_average >= 8
      ? "text-emerald-400"
      : vote_average >= 6
        ? "text-accent-400"
        : "text-red-400";

  return (
    <Link href={`/movies/${id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden bg-cinema-800 border borde-cinema-600 hover:borde-cinema-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden bg-cinema-700">
          {poster_path ? (
            <Image
              alt={title}
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
          )}
          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
            <svg
              className="w-3 h-3 text-accent-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className={`text-xs font-bold ${ratingColor}`}>
              {vote_average?.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-sm font-semibold text-white truncate group-hover:text-accent-400 transition-colors">
            {title}
          </p>
          <p className="text-xs text-muted-500 mt-0.5">{year}</p>
          {genreNames?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {genreNames.map((name) => (
                <span
                  key={name}
                  className="text-[10px] px-1.5 py-0.5 rounded-md bg-cinema-700 text-muted-400 border borde-cinema-600"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export { MovieCard };
