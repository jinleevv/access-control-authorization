import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import UpdatePassword from "../ui/account-info/UpdatePassword";

export default async function AccountInfoPage() {
  const session = await auth();
  const userSession = session?.user;

  if (!userSession) redirect("/login");

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">Account Information</Label>
          <Label className="pl-1">
            Please use this page to update your information
          </Label>
        </div>
        <div className="mt-6">
          <UpdatePassword email={userSession.email} />
        </div>
      </div>
    </section>
  );
}
