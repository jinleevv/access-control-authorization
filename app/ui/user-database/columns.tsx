"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  department: string | null;
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
    accessorKey: "department",
    header: "Department",
  },
];
