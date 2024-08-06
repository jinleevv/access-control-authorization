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

  const matchingRequesters = await prisma.requestForm.findMany({
    where: {
      requesterFirstName: requesterInfo.firstName,
      requesterLastName: requesterInfo.lastName,
      requesterPhoneNumber: requesterInfo.phoneNumber,
      requesterCompany: requesterInfo.company,
    },
  });

  const data = matchingRequesters.map((form) => ({
    id: form.id,
    status: form.status,
    visitorFullName: form.visitorFullName,
    visitorCompany: form.visitorCompany,
    visitorPhoneNumber: form.visitorPhoneNumber,
    durationStart: form.durationOfVisitStart,
    durationEnd: form.durationOfVistitEnd,
    purpose: form.purposeOfVisit,
  }));

  return (
    <section className="h-full">
      <DataTable columns={columns} data={data} />
    </section>
  );
}
