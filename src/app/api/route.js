import { NextResponse } from "next/server";

const GET = async () => {
  const [moviesRes, genresRes] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie/popular?api_key=${process.env.API_KEY}`,
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
    ),
  ]);

  const movies = await moviesRes.json();
  const genres = await genresRes.json();

  return NextResponse.json({ movies, genres });
};

export { GET };
