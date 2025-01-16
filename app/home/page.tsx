import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import { HomeTopStatus } from "../ui/home/HomeTopStatus/HomeTopStatus";
import { HomeMainContents } from "../ui/home/HomeMainContents/HomeMainContents";
import { HomeFullStats } from "../ui/home/HomeFullStats/HomeFullStats";
import prisma from "@/lib/db";

export default async function RequestStatusPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  // Fetch all vehicle forms
  const vehicleForms = await prisma.vehicleEntryApplicationForm.findMany({
    select: {
      createdAt: true,
    },
  });

  // Fetch all personnel forms
  const personnelForms = await prisma.personnelEntryApplicationForm.findMany({
    select: {
      createdAt: true,
    },
  });

  // Function to convert timestamp to just 'YYYY-MM-DD'
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Create a map to count the forms by date
  const countsByDate: Record<string, { vehicle: number; personnel: number }> =
    {};

  // Count vehicle forms by date
  vehicleForms.forEach((form) => {
    const formattedDate = formatDate(form.createdAt);
    if (!countsByDate[formattedDate]) {
      countsByDate[formattedDate] = { vehicle: 0, personnel: 0 };
    }
    countsByDate[formattedDate].vehicle++;
  });

  // Count personnel forms by date
  personnelForms.forEach((form) => {
    const formattedDate = formatDate(form.createdAt);
    if (!countsByDate[formattedDate]) {
      countsByDate[formattedDate] = { vehicle: 0, personnel: 0 };
    }
    countsByDate[formattedDate].personnel++;
  });

  // Convert the result into the desired format
  const result = Object.entries(countsByDate).map(([date, counts]) => ({
    date,
    personnel: counts.personnel,
    vehicle: counts.vehicle,
  }));

  return (
    <section className="flex w-full h-screen">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full h-full p-4">
        {/* <HomeTopStatus /> */}
        <HomeMainContents />
        <HomeFullStats data={result} />
      </div>
    </section>
  );
}
