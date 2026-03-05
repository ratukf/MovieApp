import { QuickAction } from "@/components/home/QuickAction";
import { RecentMovies } from "@/components/home/RecentMovies";
import { StatsCard } from "@/components/home/StatsCard";

export default function Home() {
  return (
    <div>
      <main>
        <StatsCard />
        <QuickAction />
        <RecentMovies />
      </main>
    </div>
  );
}
