import api from "@/utils/api";

const fetchMoviesService = async () => {
  const res = await api.get("/movie/popular");
  return res.data;
};

export { fetchMoviesService };
