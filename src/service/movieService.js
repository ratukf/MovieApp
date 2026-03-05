import api from "@/utils/api";

const fetchAllCategoriesService = async () => {
  const res = await api.get("/api/all-categories");
  return res.data;
};

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

export { fetchAllCategoriesService, fetchMoviesService };
