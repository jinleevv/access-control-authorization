import { HomeFullStats } from "./ui/home/HomeFullStats/HomeFullStats";
import { HomeMainContents } from "./ui/home/HomeMainContents/HomeMainContents";
import { HomeTopStatus } from "./ui/home/HomeTopStatus/HomeTopStatus";

export default function Home() {
  return (
    <section className="w-full h-full">
      <HomeTopStatus />
      <HomeMainContents />
      <HomeFullStats />
    </section>
  );
}
