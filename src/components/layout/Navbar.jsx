"use client";

import { usePathname } from "next/navigation";

const TITLES = {
  "/": "Home",
  "/movies": "Movies",
  "/bookmarks": "Bookmarks",
  "/movies/add": "Add Movie",
};

const Navbar = () => {
  const pathname = usePathname();
  const basePath = pathname.split("?")[0];
  const title = TITLES[basePath] ?? "Movie Details";

  return (
    <header className="sticky top-0 z-20 bg-cinema-800/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-xs text-slate-500">TMDB Live</span>
      </div>
    </header>
  );
};

export { Navbar };
