import api from "@/utils/api";

const fetchMoviesService = async ({
  page = 1,
  search = "",
  genre = "",
  sort = "",
  order = "desc",
} = {}) => {
  const res = await api.get(
    `/api?page=${page}&search=${search}&genre=${genre}&sort=${sort}&order=${order}`,
  );
  return res.data;
};

export { fetchMoviesService };
