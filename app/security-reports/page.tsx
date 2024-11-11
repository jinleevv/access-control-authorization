import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import { Label } from "@/components/ui/label";
import Reports from "../ui/security-reports/Reports";

export default async function SecurityReportsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="ml-10 mr-10">
          <Label className="grid text-2xl font-bold">Security Reports</Label>
          <Label className="ml-1">
            Send the security reports to the supervisor.
          </Label>
        </div>
        <div className="mt-3 ml-10 mr-10">
          <Reports />
        </div>
      </div>
    </section>
  );
}
