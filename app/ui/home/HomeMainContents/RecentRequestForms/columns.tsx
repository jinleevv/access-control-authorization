"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type RequestFormStatus = {
  id: string;
  visitorFirstName: string;
  visitorCompany: string;
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
    accessorKey: "visitorFirstName",
    header: "Visitor First Name",
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
