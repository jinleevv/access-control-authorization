import { Label } from "@/components/ui/label";
import { RequestForm } from "../ui/request-form/RequestForm/RequestForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RequestFormPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="w-full h-full">
      <div className="ml-10 mr-10">
        <Label className="grid text-2xl font-bold">
          Upload Access Request Form
        </Label>
        <Label className="ml-1">Fill out the access request form</Label>
      </div>
      <div className="mt-3 ml-10 mr-10">
        <RequestForm />
      </div>
    </section>
  );
}
