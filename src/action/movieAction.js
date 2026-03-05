import {
  fetchAllCategoriesService,
  fetchMoviesService,
} from "@/service/movieService";
import { useMovieStore } from "@/store/movieStore";

const CATEGORIES = ["now_playing", "popular", "top_rated", "upcoming"];

const fetchAllCategoriesAction = async () => {
  const {
    setMoviesByCategory,
    setGenres,
    setIsFetched,
    setIsCategoryLoading,
    isFetched,
    setActiveCategory,
    setMovies,
    setPage,
    setTotal,
    setTotalPage,
  } = useMovieStore.getState();

  if (isFetched) return;

  setIsCategoryLoading(true);

  try {
    const res = await fetchAllCategoriesService();

    setGenres(res.genres);

    CATEGORIES.forEach((cat) => {
      setMoviesByCategory(cat, res[cat].results);
    });

    const defaultCategory = "popular";
    setActiveCategory(defaultCategory);
    setMovies(res[defaultCategory].results);
    setPage(res[defaultCategory].page);
    setTotal(res[defaultCategory].total_results);
    setTotalPage(res[defaultCategory].total_pages);

    setIsFetched(true);
  } catch (err) {
    console.error("Failed to fetch all categories", err);
  } finally {
    setIsCategoryLoading(false);
  }
};

const switchCategoryAction = (category) => {
  const { moviesByCategory, setMovies, setActiveCategory } =
    useMovieStore.getState();

  const movies = moviesByCategory[category] ?? [];
  setMovies(movies);
  setActiveCategory(category);
};

const fetchMovieAction = async ({
  page = 1,
  search = "",
  genre = "",
  sort = "",
  order = "desc",
  category = "",
} = {}) => {
  const { setMovies, setPage, setTotal, setTotalPage, setIsLoading, setError } =
    useMovieStore.getState();

  setIsLoading(true);
  setError(null);

  try {
    const res = await fetchMoviesService({
      page,
      search,
      genre,
      sort,
      order,
      category,
    });

    setMovies(res.movies.results);
    setPage(res.movies.page);
    setTotal(res.movies.total_results);
    setTotalPage(res.movies.total_pages);
  } catch (err) {
    setMovies([]);
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

export { fetchAllCategoriesAction, switchCategoryAction, fetchMovieAction };
