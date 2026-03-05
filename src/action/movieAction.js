import { fetchMoviesService } from "@/service/movieService";
import { useMovieStore } from "@/store/movieStore";

const fetchMovieAction = async () => {
  const {
    setMovies,
    setGenres,
    setPage,
    setTotal,
    setTotalPage,
    setIsLoading,
    setError,
    setIsFetched,
  } = useMovieStore.getState();

  setIsLoading(true);
  setError(null);

  try {
    const res = await fetchMoviesService();

    setMovies(res.movies.results);
    setGenres(res.genres.genres);
    setPage(res.movies.page);
    setTotal(res.movies.total_results);
    setTotalPage(res.movies.total_pages);
    setIsFetched(true);
  } catch (err) {
    setMovies([]);
    // Error state handler for each different response status
    if (!navigator.onLine) {
      setError("No internet connection.");
    } else if (err.response?.status === 401) {
      setError("API key is not valid.");
    } else if (err.response?.status === 404) {
      setError("Data not found.");
    } else if (err.response?.status >= 500) {
      setError("Server is error, try again later.");
    } else {
      setError("Error, try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

export { fetchMovieAction };
