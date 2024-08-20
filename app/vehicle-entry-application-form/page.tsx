import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ApplicationForm } from "../ui/request-form/ApplicationForm";
import Sidebar from "../ui/sidebar/sidebar";

export default async function VehicleEntryApplicationPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="ml-10 mr-10">
          <Label className="grid text-2xl font-bold">
            Vehicle Entry Application Form
          </Label>
          <Label className="ml-1">
            Fill out the vehicle access request form
          </Label>
        </div>
        <div className="mt-3 ml-10 mr-10">
          
        </div>
      </div>
    </section>
  );
}
