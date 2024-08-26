import { Label } from "@/components/ui/label";
import { columns as PersonnelColumns } from "./personnel-status/columns";
import { columns as VehicleColumns } from "./vehicle-status/columns";
import { DataTable as PersonnelDataTable } from "./personnel-status/data-table";
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
  };

  const matchingPersonnelRequesters =
    await prisma.personnelEntryApplicationForm.findMany({
      where: {
        requesterFirstName: requesterInfo.firstName,
        requesterLastName: requesterInfo.lastName,
        requesterPhoneNumber: requesterInfo.phoneNumber,
        requesterCompany: requesterInfo.company,
      },
    });

  const matchingVehicleRequesters =
    await prisma.vehicleEntryApplicationForm.findMany({
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

  const dataPersonnel = matchingPersonnelRequesters.map((form) => ({
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

  const dataVehicle = matchingVehicleRequesters.map((form) => ({
    id: form.id,
    status: form.status,
    driverFullName: form.driverName,
    driverCompany: form.driverCompany,
    driverPhoneNumber: form.driverPhoneNumber,
    driverPosition: form.driverPosition,
    durationStart: form.durationOfVisitStart.toLocaleDateString(
      "en-US",
      options
    ),
    durationEnd: form.durationOfVistitEnd.toLocaleDateString("en-US", options),
    purpose: form.purpose,
    createdAt: form.createdAt.toLocaleDateString("en-US", options),
  }));

  return (
    <section className="w-full h-full space-y-12">
      <div className="h-[340px] 2xl:h-[400px]">
        <Label className="text-lg font-bold">
          Personnel Entry Application Form
        </Label>
        <PersonnelDataTable
          columns={PersonnelColumns}
          data={dataPersonnel.sort((a, b) =>
            a.createdAt.localeCompare(b.createdAt)
          )}
        />
      </div>
      <div className="h-[340px] 2xl:h-[400px]">
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
