const { fetchMoviesService } = require("@/service/movieService");

const fetchMovieAction = async () => {
  try {
    await fetchMoviesService();
  } catch (err) {}
};

export { fetchMovieAction };
