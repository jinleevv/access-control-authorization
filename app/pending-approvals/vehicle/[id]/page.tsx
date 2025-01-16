import Sidebar from "@/app/ui/sidebar/sidebar";
import VehicleApprovalDetailPage from "@/app/ui/vehicleApprovalDetailPage/ApprovalDetail";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ApprovalDetailPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const userSession = session.user;
  return (
    <section className="flex w-full h-full">
      <div className="w-3/12">
        <Sidebar />
      </div>
      <div className="w-full h-full">
        <VehicleApprovalDetailPage userSession={userSession}/>
      </div>
    </section>
  );
}
