import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { RequestFormStatus } from "../ui/request-form-status/RequestFormStatus";
import Sidebar from "../ui/sidebar/sidebar";
import { HomeTopStatus } from "../ui/home/HomeTopStatus/HomeTopStatus";
import { HomeMainContents } from "../ui/home/HomeMainContents/HomeMainContents";
import { HomeFullStats } from "../ui/home/HomeFullStats/HomeFullStats";

export default async function RequestStatusPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <HomeTopStatus />
        <HomeMainContents />
        <HomeFullStats />
      </div>
    </section>
  );
}
