"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type VehicleEntryApplicationFormStatus = {
  id: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterDepartment: string;
  requesterEmail: string;
  status: string;
  driverFullName: string | null;
  driverCompany: string | null;
  vehicleNumber: string | null;
  vehicleProvince: string | null;
  vehicleType: string | null;
  vehicleCompanions: string | null;
  durationStart: string;
  durationEnd: string;
  createdAt: string;
};

export const columns: ColumnDef<VehicleEntryApplicationFormStatus>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "In Progress") {
        return (
          <div className="flex w-[100px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-yellow-600 bg-yellow-100">
            <div className="size-2 rounded-full bg-yellow-500">
              <span className="flex w-[100px] ml-3 -mt-1.5 text-[12px] font-medium text-yellow-600">
                In Progress
              </span>
            </div>
          </div>
        );
      } else if (status == "Approved") {
        return (
          <div className="flex w-[100px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-success-600 bg-green-100">
            <div className="size-2 rounded-full bg-green-600">
              <span className="flex w-[100px] ml-4 -mt-1.5 text-[12px] font-medium text-success-700">
                Approved
              </span>
            </div>
          </div>
        );
      } else if (status == "Rejected") {
        return (
          <div className="flex w-[100px] h-8 gap-1 rounded-2xl border-[1.5px] p-3 border-red-600 bg-red-100">
            <div className="size-2 rounded-full bg-red-600">
              <span className="flex w-[100px] ml-4 -mt-1.5 text-[12px] font-medium text-red-700">
                Rejected
              </span>
            </div>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Requested Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  { accessorKey: "requesterEmail", header: "Requester Email" },
  {
    accessorKey: "driverFullName",
    header: "Driver Name",
  },
  {
    accessorKey: "driverCompany",
    header: "Driver Company",
  },
  {
    accessorKey: "durationStart",
    header: "From",
  },
  {
    accessorKey: "durationEnd",
    header: "To",
  },
  { accessorKey: "vehicleNumber", header: "Vehicle Number" },
  { accessorKey: "vehicleProvince", header: "Vehicle Province" },
  { accessorKey: "vehicleType", header: "Vehicle Type" },
  { accessorKey: "vehicleCompanions", header: "# of People" },
];
