import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import { Label } from "@/components/ui/label";
import CheckOutPageStatus from "../ui/check-out/CheckOutStatus";

export default async function CheckOutPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">Check Out</Label>
          <Label className="pl-1">
            Please use this page to manage the check out of visitor
          </Label>
        </div>
        <div>
          <CheckOutPageStatus />
        </div>
      </div>
    </section>
  );
}
