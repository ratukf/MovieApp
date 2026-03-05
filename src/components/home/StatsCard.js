import Link from "next/link";

const StatsCard = () => {
  const stats = [
    {
      label: "Total Movies",
      value: "10,000+",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      ),
      color: "from-violet-500 to-purple-700",
      lightColor: "text-violet-400",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Top Rated",
      value: "9.0+",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: "from-yellow-400 to-amber-600",
      lightColor: "text-accent-400",
      bgColor: "bg-accent-500/10",
    },
    {
      label: "Categories",
      value: "20 Genres",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "from-emerald-500 to-teal-700",
      lightColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-2xl bg-cinema-800 border borde-cinema-600 p-5 group hover:borde-cinema-500 transition-all duration-300"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div
              className={`p-2.5 rounded-xl ${stat.bgColor} ${stat.lightColor}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { StatsCard };
