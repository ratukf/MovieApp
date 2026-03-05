import { create } from "zustand";

const useMovieStore = create((set) => ({
  // State
  moviesByCategory: {},
  movies: [],
  genres: [],
  bookmarks: [],
  page: 0,
  totalPage: 0,
  total: 0,
  isLoading: false,
  isCategoryLoading: false,
  error: null,
  isFetched: false,
  activeCategory: "",

  // Setters
  setMovies: (movies) => set({ movies }),
  setMoviesByCategory: (category, movies) =>
    set((state) => ({
      moviesByCategory: { ...state.moviesByCategory, [category]: movies },
    })),
  setGenres: (genres) => set({ genres }),
  setPage: (page) => set({ page }),
  setTotal: (total) => set({ total }),
  setTotalPage: (totalPage) => set({ totalPage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsCategoryLoading: (isCategoryLoading) => set({ isCategoryLoading }),
  setError: (error) => set({ error }),
  setIsFetched: (isFetched) => set({ isFetched }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),

  // CRUD
  addMovie: (movie) =>
    set((state) => {
      const updatedMovies = [movie, ...state.movies];
      const activeCategory = state.activeCategory || "popular";
      return {
        movies: updatedMovies,
        moviesByCategory: {
          ...state.moviesByCategory,
          [activeCategory]: updatedMovies,
        },
      };
    }),

  deleteMovie: (id) =>
    set((state) => {
      const updatedMovies = state.movies.filter((m) => m.id !== id);
      const activeCategory = state.activeCategory || "popular";
      return {
        movies: updatedMovies,
        moviesByCategory: {
          ...state.moviesByCategory,
          [activeCategory]: updatedMovies,
        },
      };
    }),

  updateMovie: (id, updated) =>
    set((state) => {
      const updatedMovies = state.movies.map((m) =>
        m.id === id ? { ...m, ...updated } : m,
      );
      const activeCategory = state.activeCategory || "popular";
      return {
        movies: updatedMovies,
        moviesByCategory: {
          ...state.moviesByCategory,
          [activeCategory]: updatedMovies,
        },
      };
    }),
  toggleBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks.includes(id)
        ? state.bookmarks.filter((b) => b !== id)
        : [...state.bookmarks, id],
    })),
}));

export { useMovieStore };
