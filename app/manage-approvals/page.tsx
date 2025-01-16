import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import prisma from "@/lib/db";
import ManageApprovalsData from "../ui/manage-approvals/ManageApprovals";

export default async function ManageApprovalsPage() {
  const session = await auth();
  const userSession = session?.user;

  if (!userSession) redirect("/login");

  if (userSession.department !== "IT") {
    if (!userSession.admin) {
      redirect("/home");
    }
  }

  const VehicleApprovalForms =
    await prisma.vehicleEntryApplicationForm.findMany();

  const VehicleApprovalsData = VehicleApprovalForms.map((form) => ({
    id: form.id,
    status: form.status,
    requesterName: form.requesterFirstName + " " + form.requesterLastName,
    requesterEmail: form.requesterEmail,
    approvalEmail: form.supervisorEmail,
  }));

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">Manage Approvals</Label>
          <Label className="pl-1">Review and manage the approvals</Label>
        </div>
        <div>
          <ManageApprovalsData vehicleData={VehicleApprovalsData} />
        </div>
      </div>
    </section>
  );
}
