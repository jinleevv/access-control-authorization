"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VehiclePendingApprovals = {
  id: string;

  requesterFirstName: string;
  requesterLastName: string;
  requesterDateOfBirth: string;
  requesterPhoneNumber: string;
  requesterCompany: string;

  vehicleProvince: string;
  vehicleNumber: string;
  vehicleType: string;
  vehicleModel: string;

  driverCompany: string;
  driverName: string;
  driverPhoneNumber: string;
  driverPosition: string;

  durationOfVisitStart: Date;
  durationOfVisitEnd: Date;

  supervisor: string;
  pledgeSigned: boolean;
  status: string;

  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<VehiclePendingApprovals>[] = [
  {
    accessorKey: "requesterFirstName",
    header: "Requester First Name",
  },
  {
    accessorKey: "requesterLastName",
    header: "Requester Last Name",
  },
  {
    accessorKey: "requesterEmail",
    header: "Requester Email",
  },
];
