import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import { ExportPersonnelData } from "../ui/export-data/ExportPersonnelData";
import { ExportVehicleData } from "../ui/export-data/ExportVehicleData";

export default async function ExportDataPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.admin === false) redirect("/home");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">Export Data</Label>
          <Label className="pl-1">Export Application Form Data</Label>
        </div>
        <div className="pl-10 pr-10 mt-8">
          <Label className="font-bold text-lg">Personnel Entry Data:</Label>
          <ExportPersonnelData />
        </div>
        <div className="pl-10 pr-10 mt-8">
          <Label className="font-bold text-lg">Vehicle Entry Data:</Label>
          <ExportVehicleData />
        </div>
      </div>
    </section>
  );
}
