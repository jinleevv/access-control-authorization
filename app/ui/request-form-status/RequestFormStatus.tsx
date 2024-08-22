import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

interface RequestFormStatusProps {
  requester: any;
}

export async function RequestFormStatus({ requester }: RequestFormStatusProps) {
  const requesterInfo = {
    firstName: requester.firstName,
    lastName: requester.lastName,
    phoneNumber: requester.phoneNumber,
    company: requester.company,
  };

  const matchingRequesters = await prisma.personnelEntryApplicationForm.findMany({
    where: {
      requesterFirstName: requesterInfo.firstName,
      requesterLastName: requesterInfo.lastName,
      requesterPhoneNumber: requesterInfo.phoneNumber,
      requesterCompany: requesterInfo.company,
    },
  });

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const data = matchingRequesters.map((form) => ({
    id: form.id,
    status: form.status,
    visitorFullName: form.visitorFullName,
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

  return (
    <section className="h-full">
      <DataTable
        columns={columns}
        data={data.sort((a, b) => a.createdAt.localeCompare(b.createdAt))}
      />
    </section>
  );
}
