import { NextResponse } from "next/server";

const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;

  const [moviesRes, genresRes] = await Promise.all([
    fetch(
      `${process.env.API_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${page}`,
    ),
    fetch(
      `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
    ),
  ]);

  const movies = await moviesRes.json();
  const genres = await genresRes.json();

  return NextResponse.json({ movies, genres });
};

export { GET };
