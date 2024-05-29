import { doLogout } from "./actions";
import { HomeFullStats } from "./ui/home/HomeFullStats/HomeFullStats";
import { HomeMainContents } from "./ui/home/HomeMainContents/HomeMainContents";
import { HomeTopStatus } from "./ui/home/HomeTopStatus/HomeTopStatus";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="w-full h-full">
      <form action={doLogout}>
        <button
          className="bg-blue-400 my-2 text-white p-1 rounded"
          type="submit"
        >
          Logout
        </button>
      </form>
      <HomeTopStatus />
      <HomeMainContents />
      <HomeFullStats />
    </section>
  );
}
