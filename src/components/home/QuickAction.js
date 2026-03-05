import Link from "next/link";

const QuickAction = () => {
  const actions = [
    {
      label: "Browse Movies",
      href: "/movies",
      description: "Explore the full library",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      ),
      gradient:
        "from-violet-500/20 to-purple-600/20 hover:from-violet-500/30 hover:to-purple-600/30",
      border: "border-violet-500/20 hover:border-violet-400/40",
      iconColor: "text-violet-400",
    },
    {
      label: "Add Movie",
      href: "/movies/add",
      description: "Add to your collection",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      gradient:
        "from-yellow-500/20 to-amber-600/20 hover:from-yellow-500/30 hover:to-amber-600/30",
      border: "border-yellow-500/20 hover:border-yellow-400/40",
      iconColor: "text-accent-400",
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      description: "View saved movies",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      ),
      gradient:
        "from-emerald-500/20 to-teal-600/20 hover:from-emerald-500/30 hover:to-teal-600/30",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold text-muted-500 uppercase tracking-widest mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br ${action.gradient} border ${action.border} transition-all duration-300 group`}
          >
            <div className={`${action.iconColor} flex-shrink-0`}>
              {action.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white group-hover:text-white">
                {action.label}
              </p>
              <p className="text-xs text-muted-500">{action.description}</p>
            </div>
            <svg
              className="w-4 h-4 text-muted-400 ml-auto group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
};

export { QuickAction };
