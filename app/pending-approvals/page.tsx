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

  const myFullName = session.user.firstName + " " + session.user.lastName;

  const matchingPersonnelForms =
    await prisma.personnelEntryApplicationForm.findMany({
      where: {
        supervisor: myFullName,
        status: "In Progress",
      },
    });

  const matchingVehicleForms =
    await prisma.vehicleEntryApplicationForm.findMany({
      where: {
        supervisor: myFullName,
        status: "In Progress",
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
        <div className="mt-10 ml-10 mr-10 space-y-5">
          <Label className="text-lg font-bold">
            Personnel Entry Approval Lists
          </Label>
          <PersonnelPendingApprovals data={matchingPersonnelForms} />
        </div>
        <div className="mt-10 ml-10 mr-10 space-y-5">
          <Label className="text-lg font-bold">
            Vehicle Entry Approval Lists
          </Label>
          <VehiclePendingApprovals data={matchingVehicleForms} />
        </div>
      </div>
    </section>
  );
}
