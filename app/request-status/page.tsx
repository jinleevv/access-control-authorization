import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function RequestStatusPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return <div>Request Status Page</div>;
}
