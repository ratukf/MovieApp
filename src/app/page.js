import { QuickAction } from "@/components/home/QuickAction";
import { RecentMovies } from "@/components/home/RecentMovies";
import { StatsCard } from "@/components/home/StatsCard";

const Home = () => {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">
          Welcome back 🎬
        </h2>
        <p className="text-slate-500 text-sm">
          Discover and manage your movie collection
        </p>
      </div>
      <StatsCard />
      <QuickAction />
      <RecentMovies />
    </div>
  );
};

export default Home;
