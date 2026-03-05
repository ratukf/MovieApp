import api from "@/utils/api";

const fetchMoviesService = async ({
  page = 1,
  search = "",
  genre = "",
  sort = "",
  order = "desc",
  category = "",
} = {}) => {
  const res = await api.get(
    `/api?page=${page}&search=${search}&genre=${genre}&sort=${sort}&order=${order}&category=${category}`,
  );
  return res.data;
};

export { fetchMoviesService };
