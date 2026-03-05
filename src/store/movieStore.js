import { create } from "zustand";

const useMovieStore = create((set) => ({
  // State
  movies: [],
  page: 0,
  totalPage: 0,
  total: 0,
  isLoading: false,
  error: null,

  // State setter
  setMovies: (movies) => set({ movies }),
  setPage: (page) => set({ page }),
  setTotal: (total) => set({ total }),
  setTotalPage: (totalPage) => set({ totalPage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

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
