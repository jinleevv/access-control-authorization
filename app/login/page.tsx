import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginPage from "../ui/login/LoginForm";

export default async function PendingApprovalsPage() {
  const session = await auth();

  if (session?.user) redirect("/home");

  return (
    <section className="flex w-full h-full">
      <LoginPage />
    </section>
  );
}
