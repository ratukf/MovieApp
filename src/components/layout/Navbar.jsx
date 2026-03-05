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
  const title = TITLES[basePath] ?? "Movies";

  return (
    <nav>
      <p>{title}</p>
    </nav>
  );
};

export { Navbar };
