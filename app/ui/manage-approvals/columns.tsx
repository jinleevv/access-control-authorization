"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ManageApprovals = {
  id: string
  status: string
  requesterName: string
  requesterEmail: string
  approvalName: string
  approvalEmail: string
}

export const columns: ColumnDef<ManageApprovals>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "requesterName",
    header: "Requester Name",
  },
  {
    accessorKey: "requesterEmail",
    header: "Requester Email",
  },
  {
    accessorKey: "approvalName",
    header: "Approval Name",
  },
  {
    accessorKey: "approvalEmail",
    header: "Approval Email",
  },
]
