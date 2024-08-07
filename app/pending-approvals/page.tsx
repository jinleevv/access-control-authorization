import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PendingApprovals } from "../ui/pending-approvals/PendingApprovals";

export default async function PendingApprovalsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="w-full h-full">
      <div className="ml-10 mr-10">
        <Label className="grid text-2xl font-bold">Pending Approvals</Label>
        <Label className="ml-1">
          Review the requested forms and either approve or reject
        </Label>
      </div>
      <div className="mt-3 ml-10 mr-10">
        <PendingApprovals requester={session.user} />
      </div>
    </section>
  );
}
