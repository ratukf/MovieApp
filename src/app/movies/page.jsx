import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/movies/Pagination";

const MoviesPage = () => {
  return (
    <main>
      <MovieList />
      <Pagination />
    </main>
  );
};

export default MoviesPage;
