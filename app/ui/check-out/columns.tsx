"use client";

import { ColumnDef } from "@tanstack/react-table";

export type CheckOutStatusType = {
  id: string;
  visitorFirstName: string;
  visitorLastName: string;
  createdAt: Date;
  checkOut: Date | null;
};

export const columns: ColumnDef<CheckOutStatusType>[] = [
  {
    accessorKey: "visitorFirstName",
    header: "Visitor First Name",
  },
  {
    accessorKey: "visitorLastName",
    header: "Visitor Last Name",
  },
  {
    accessorKey: "createdAt",
    header: "Check In",
  },
];
