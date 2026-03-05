const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Movies",
    children: [
      { label: "Now Playing", href: "/movies?category=now_playing" },
      { label: "Popular", href: "/movies?category=popular" },
      { label: "Top Rated", href: "/movies?category=top_rated" },
      { label: "Upcoming", href: "/movies?category=upcoming" },
    ],
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
  },
];

export default NAV_ITEMS;
