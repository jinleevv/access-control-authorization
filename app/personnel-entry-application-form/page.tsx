import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PersonnelEntryApplicationForm } from "../ui/personnel-entry-application-form/ApplicationForm";
import Sidebar from "../ui/sidebar/sidebar";

export default async function RequestFormPage() {
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
            Upload Access Request Form
          </Label>
          <Label className="ml-1">Fill out the access request form</Label>
        </div>
        <div className="mt-3 ml-10 mr-10">
          <PersonnelEntryApplicationForm requester={session.user} />
        </div>
      </div>
    </section>
  );
}
