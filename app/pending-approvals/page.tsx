import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PersonnelPendingApprovals } from "../ui/personnel-pending-approvals/PersonnelPendingApprovals";
import prisma from "@/lib/db";
import Sidebar from "../ui/sidebar/sidebar";
import { VehiclePendingApprovals } from "../ui/vehicle-pending-approvals/VehiclePendingApprovals";

export default async function PendingApprovalsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const myEmail: string = session.user.email;

  const matchingVehicleForms =
    await prisma.vehicleEntryApplicationForm.findMany({
      where: {
        status: "In Progress",
        supervisorEmail: myEmail,
      },
    });

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="ml-10 mr-10">
          <Label className="grid text-2xl font-bold">Pending Approvals</Label>
          <Label className="ml-1">
            Review the requested forms and either approve or reject
          </Label>
        </div>
        <div className="mt-3 ml-10 mr-10 space-y-2 h-[710px] 2xl:h-[840px]">
          <Label className="text-lg font-bold">
            Vehicle Entry Approval Lists
          </Label>
          <VehiclePendingApprovals data={matchingVehicleForms} />
        </div>
      </div>
    </section>
  );
}
