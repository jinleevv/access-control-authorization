"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type RequestFormStatus = {
  id: string;
  status: string;
  visitorFullName: string;
  visitorCompany: string;
  visitorPhoneNumber: string;
  durationStart: string;
  durationEnd: string;
  purpose: string;
  createdAt: string;
};

export const columns: ColumnDef<RequestFormStatus>[] = [
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
  {
    accessorKey: "visitorFullName",
    header: "Visitor Name",
  },
  {
    accessorKey: "visitorCompany",
    header: "Visitor Company",
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
  },
];
