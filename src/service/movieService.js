import api from "@/utils/api";

const fetchMoviesService = async () => {
  const res = await api.get("/api");
  return res.data;
};

export { fetchMoviesService };
