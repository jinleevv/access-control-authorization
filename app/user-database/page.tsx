import { auth } from "@/auth";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Sidebar from "../ui/sidebar/sidebar";
import prisma from "@/lib/db";
import { UserDataTable } from "../ui/user-database/data-table";
import { columns } from "../ui/user-database/columns";

export default async function UserDatabasePage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.admin === false) redirect("/home");

  const users = await prisma.user.findMany();

  const usersData = users.map((form) => ({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    department: form.department,
    admin: form.admin,
  }));

  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div className="pl-10 pr-10">
          <Label className="grid text-2xl font-bold">User Database</Label>
          <Label className="pl-1">User Database for Admin</Label>
        </div>
        <div className="ml-10 mr-10 mt-7 h-[750px] 2xl:h-[900px] border rounded-lg overflow-auto">
          <UserDataTable columns={columns} data={usersData} />
        </div>
      </div>
    </section>
  );
}
