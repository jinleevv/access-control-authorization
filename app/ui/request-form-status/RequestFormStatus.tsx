import { Label } from "@/components/ui/label";
import {
  columns as VehicleColumns,
  VehicleEntryApplicationFormStatus,
} from "./vehicle-status/columns";
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
    await prisma.vehicleEntryApplicationForm.findMany();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dataVehicle: VehicleEntryApplicationFormStatus[] =
    matchingVehicleRequesters.map((form) => ({
      id: form.id,
      requesterFirstName: form.requesterFirstName,
      requesterLastName: form.requesterLastName,
      requesterDepartment: form.requesterDepartment,
      requesterEmail: form.requesterEmail,
      status: form.status,
      driverFullName: form.driverFullName,
      driverCompany: form.driverCompany,
      vehicleNumber: form.vehicleNumber,
      vehicleProvince: form.vehicleProvince,
      vehicleType: form.vehicleType,
      vehicleCompanions: form.vehicleCompanions,
      durationStart: form.durationStart.toLocaleDateString("en-US", options),
      durationEnd: form.durationEnd.toLocaleDateString("en-US", options),
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
