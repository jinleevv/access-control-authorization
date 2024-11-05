import { Label } from "@/components/ui/label";
import { RequestFormStatus, columns } from "./columns";
import { DataTable } from "./data-table";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

async function getData(): Promise<RequestFormStatus[]> {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const requester = session.user;

  const requesterInfo = {
    firstName: requester.firstName,
    lastName: requester.lastName,
    department: requester.department,
  };

  const matchingRequesters =
    await prisma.personnelEntryApplicationForm.findMany({
      where: {
        requesterFirstName: requesterInfo.firstName,
        requesterLastName: requesterInfo.lastName,
      },
    });

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const data = matchingRequesters.map((form) => ({
    id: form.id,
    visitorFirstName: form.visitorFirstName,
    visitorCompany: form.visitorCompany,
    visitorPhoneNumber: form.visitorPhoneNumber,
    durationStart: form.durationOfVisitStart.toLocaleDateString(
      "en-US",
      options
    ),
    durationEnd: form.durationOfVistitEnd.toLocaleDateString("en-US", options),
    purpose: form.purposeOfVisit,
    createdAt: form.createdAt.toLocaleDateString("en-US", options),
  }));

  return data
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
}

export async function RecentRequestForms() {
  const data = await getData();

  return (
    <>
      <div className="w-full h-full mt-2 space-y-3">
        <Label className="text-lg font-bold">
          Recent Personnel Entry Application Forms
        </Label>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
