import { NextResponse } from "next/server";

const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "popularity";
  const order = searchParams.get("order") || "desc";

  const moviesEndpoint = search
    ? `${process.env.API_URL}/search/movie?api_key=${process.env.API_KEY}&page=${page}&query=${search}`
    : `${process.env.API_URL}/discover/movie?api_key=${process.env.API_KEY}&page=${page}&with_genres=${genre}&sort_by=${sort}.${order}`;

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
