import { NextResponse } from "next/server";

const GET = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/popular?api_key=${process.env.API_KEY}`,
  );
  const data = await res.json();

  return NextResponse.json(data);
};

export { GET };
