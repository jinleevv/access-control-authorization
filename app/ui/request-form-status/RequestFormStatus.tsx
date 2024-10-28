import { Label } from "@/components/ui/label";
import { columns as VehicleColumns } from "./vehicle-status/columns";
import prisma from "@/lib/db";
import { DataTable as VehicleDataTable } from "./vehicle-status/data-table";

interface RequestFormStatusProps {
  requester: any;
}

export async function RequestFormStatus({ requester }: RequestFormStatusProps) {
  const requesterInfo = {
    firstName: requester.firstName,
    lastName: requester.lastName,
    phoneNumber: requester.phoneNumber,
    company: requester.company,
    email: requester.email,
  };

  const matchingVehicleRequesters =
    await prisma.vehicleEntryApplicationForm.findMany({
      where: {
        requesterFirstName: requesterInfo.firstName,
        requesterLastName: requesterInfo.lastName,
        requesterPhoneNumber: requesterInfo.phoneNumber,
        requesterCompany: requesterInfo.company,
        requesterEmail: requesterInfo.email,
      },
    });

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dataVehicle = matchingVehicleRequesters.map((form) => ({
    id: form.id,
    status: form.status,
    driverFullName: form.driverName,
    driverCompany: form.driverCompany,
    driverPhoneNumber: form.driverPhoneNumber,
    durationStart: form.durationOfVisitStart.toLocaleDateString(
      "en-US",
      options
    ),
    durationEnd: form.durationOfVistitEnd.toLocaleDateString("en-US", options),
    createdAt: form.createdAt.toLocaleDateString("en-US", options),
  }));

  return (
    <section className="w-full h-full space-y-12">
      <div className="h-full">
        <Label className="text-lg font-bold">
          Vehicle Entry Application Form
        </Label>
        <VehicleDataTable
          columns={VehicleColumns}
          data={dataVehicle.sort((a, b) =>
            a.createdAt.localeCompare(b.createdAt)
          )}
        />
      </div>
    </section>
  );
}
