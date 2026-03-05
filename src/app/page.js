import { QuickAction } from "@/components/home/QuickAction";
import { RecentMovies } from "@/components/home/RecentMovies";
import { StatsCard } from "@/components/home/StatsCard";

const Home = () => {
  return (
    <div>
      <main>
        <StatsCard />
        <QuickAction />
        <RecentMovies />
      </main>
    </div>
  );
};

export default Home;
