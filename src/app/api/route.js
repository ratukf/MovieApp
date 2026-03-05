import { NextResponse } from "next/server";

const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "popularity";
  const order = searchParams.get("order") || "desc";
  const category = searchParams.get("category") || "";

  const CATEGORY_ENDPOINTS = {
    now_playing: "movie/now_playing",
    popular: "movie/popular",
    top_rated: "movie/top_rated",
    upcoming: "movie/upcoming",
  };

  const categoryPath = CATEGORY_ENDPOINTS[category];

  const SORT_MAP = {
    popularity: "popularity",
    vote_average: "vote_average",
    release_date: "primary_release_date", // ini yang bener di TMDB
  };

  const tmdbSort = SORT_MAP[sort] || "popularity";

  const moviesEndpoint = search
    ? `${process.env.API_URL}/search/movie?api_key=${process.env.API_KEY}&page=${page}&query=${search}`
    : categoryPath
      ? `${process.env.API_URL}/${categoryPath}?api_key=${process.env.API_KEY}&page=${page}`
      : `${process.env.API_URL}/discover/movie?api_key=${process.env.API_KEY}&page=${page}&with_genres=${genre}&sort_by=${tmdbSort}.${order}${tmdbSort === "vote_average" ? "&vote_count.gte=50" : ""}`;

  const [moviesRes, genresRes] = await Promise.all([
    fetch(moviesEndpoint),
    fetch(
      `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
    ),
  ]);

  const movies = await moviesRes.json();
  const genres = await genresRes.json();

  return NextResponse.json({ movies, genres });
};

export { GET };
