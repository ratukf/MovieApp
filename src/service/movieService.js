import api from "@/utils/api";

const fetchMoviesService = async (page = 1) => {
  const res = await api.get(`/api?page=${page}`);
  return res.data;
};

export { fetchMoviesService };
