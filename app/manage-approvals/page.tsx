import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { ManageApprovals, columns } from "../ui/manage-approvals/columns";
import { DataTable } from "../ui/manage-approvals/data-table";
import Sidebar from "../ui/sidebar/sidebar";
import prisma from "@/lib/db";

export default async function ManageApprovalsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.admin === false) redirect("/home");

  const PersonnelApprovalForms =
    await prisma.personnelEntryApplicationForm.findMany();

  const VehicleApprovalForms =
    await prisma.vehicleEntryApplicationForm.findMany();

  const PersonnelApprovalsData = PersonnelApprovalForms.map((form) => ({
    id: form.id,
    status: form.status,
    requesterName: form.requesterFirstName + " " + form.requesterLastName,
    approvalName: form.supervisor,
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
        <div>{/* <ManageApprovals /> */}</div>
      </div>
    </section>
  );
}
