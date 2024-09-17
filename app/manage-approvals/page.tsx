import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import ManageApprovals from "../ui/manage-approvals/ManageApprovals";

export default async function UserControlPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

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
          <ManageApprovals />
        </div>
      </div>
    </section>
  );
}
