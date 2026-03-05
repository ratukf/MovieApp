import { create } from "zustand";

const useMovieStore = create((set) => ({
  // State
  movies: [],
  genres: [],
  page: 0,
  totalPage: 0,
  total: 0,
  isLoading: false,
  error: null,
  isFetched: false,

  // State setter
  setMovies: (movies) => set({ movies }),
  setGenres: (genres) => set({ genres }),
  setPage: (page) => set({ page }),
  setTotal: (total) => set({ total }),
  setTotalPage: (totalPage) => set({ totalPage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setIsFetched: (isFetched) => set({ isFetched }),

  // Custom state setter (Create, Update, Delete)
  addMovie: (movie) =>
    set((state) => ({
      movies: [movie, ...state.movies],
    })),
  updateMovie: (id, updated) =>
    set((state) => ({
      movies: state.movies.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    })),
  deleteMovie: (id) =>
    set((state) => ({
      movies: state.movies.filter((m) => m.id !== id),
    })),
}));

export { useMovieStore };
