import { useMovieStore } from "@/store/movieStore";

const { fetchMoviesService } = require("@/service/movieService");

const fetchMovieAction = async () => {
  const { setMovies, setPage, setTotal, setTotalPage, setIsLoading, setError } =
    useMovieStore.getState();

  setIsLoading(true);
  setError(null);

  try {
    const res = await fetchMoviesService();

    setMovies(res.results);
    setIsLoading(false);
  } catch (err) {
    setMovies({});
    setIsLoading(false);
    // Error state handler for each different response status
    if (!navigator.onLine) {
      setError("No internet connection.");
    } else if (err.response?.status === 401) {
      setError("API key is not valid.");
    } else if (err.response?.status === 404) {
      setError("Data not found.");
    } else if (err.response?.status >= 500) {
      setError("Server is error, try again later");
    } else {
      setError("Error, try again");
    }
  }
};

export { fetchMovieAction };
