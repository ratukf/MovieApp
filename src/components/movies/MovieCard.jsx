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

  return (
    <div>
      <Link href={`/movies/${id}`}>
        <Image
          alt={title}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          width={300}
          height={450}
          loading="eager"
        />
        <p>{title}</p>
        <p>{year}</p>
        <p>{vote_average}</p>
        <div>
          {genre_ids.map((genreId, index) => (
            <span key={genreId}>
              {genres.find((g) => g.id === genreId)?.name}
              {index < genre_ids.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export { MovieCard };
