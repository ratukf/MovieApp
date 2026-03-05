// src/app/api/all-categories/route.js
import { NextResponse } from "next/server";

const CATEGORIES = ["now_playing", "popular", "top_rated", "upcoming"];

const GET = async () => {
  try {
    const [genresRes, ...categoryRes] = await Promise.all([
      fetch(
        `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
      ),
      ...CATEGORIES.map((cat) =>
        fetch(
          `${process.env.API_URL}/movie/${cat}?api_key=${process.env.API_KEY}&page=1`,
        ),
      ),
    ]);

    const genres = await genresRes.json();
    const categoryData = await Promise.all(categoryRes.map((r) => r.json()));

    const result = { genres: genres.genres };
    CATEGORIES.forEach((cat, i) => {
      result[cat] = categoryData[i];
    });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
};

export { GET };
