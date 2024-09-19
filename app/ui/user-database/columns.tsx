"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserData = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  company: string;
  admin: boolean;
};

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "admin",
    header: "Admin Status",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date Of Birth",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
];
