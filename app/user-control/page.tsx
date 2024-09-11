import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import UserCreate from "../ui/user-control/userCreate/UserCreate";
import UserDelete from "../ui/user-control/userDelete/UserDelete";

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
          <Label className="grid text-2xl font-bold">User Control</Label>
          <Label className="pl-1">
            Please use this page to create / delete a user
          </Label>
        </div>
        <div className="mt-6 p-2 rounded-lg border">
          <UserCreate />
        </div>
        <div className="mt-4 p-2 rounded-lg border">
          <UserDelete />
        </div>
      </div>
    </section>
  );
}
