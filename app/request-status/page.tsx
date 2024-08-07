import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { RequestFormStatus } from "../ui/request-form-status/RequestFormStatus";

export default async function RequestStatusPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="w-full h-full">
      <div className="pl-10 pr-10">
        <Label className="grid text-2xl font-bold">
          My Request Form Status
        </Label>
        <Label className="pl-1">Review the status of your forms</Label>
      </div>
      <div className="h-5/6 mt-3 2xl:mt-5 ml-10 mr-10">
        <RequestFormStatus requester={session.user} />
      </div>
    </section>
  );
}
