import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { RequestFormStatus } from "../ui/request-form-status/RequestFormStatus";
import Sidebar from "../ui/sidebar/sidebar";

export default async function RequestStatusPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">Request Form Status</Label>
          <Label className="pl-1">Review the status of your forms</Label>
        </div>
        <div className="h-5/6 w-5/6 mt-3 2xl:mt-5 ml-10 mr-10">
          <RequestFormStatus requester={session.user} />
        </div>
      </div>
    </section>
  );
}
