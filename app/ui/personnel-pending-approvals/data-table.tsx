"use client";

import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { PersonnelPendingApprovals } from "./columns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<PersonnelPendingApprovals | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDetailsClick = (row: TData) => {
    const selectedRow = row as PersonnelPendingApprovals;
    const today = new Date();
    const todayString = today.toISOString();

    const ID = selectedRow.id.toString();

    // Save ID to session storage
    sessionStorage.setItem("personnelId", ID);

    // Navigate without exposing the ID in the URL
    router.push(`/pending-approvals/personnel/${todayString}`);
  };

  async function handleApprove() {
    const applicationID = selectedRowData!.id;

    try {
      const response = await fetch("/api/application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "approved", id: applicationID }),
      });

      if (response.ok) {
        toast("Approved successfully");
        router.refresh();
      }
    } catch (e) {
      toast("Failed to approve the application, please contact IT department");
    }
  }

  async function handleReject() {
    const applicationID = selectedRowData!.id;

    try {
      const response = await fetch("/api/application-approval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "rejected", id: applicationID }),
      });

      if (response.ok) {
        toast("Rejected successfully");
        router.refresh();
      }
    } catch (e) {
      toast("Failed to approve the application, please contact IT department");
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                {isMounted && (
                  <div className="flex mt-1.5 justify-center">
                    <Button onClick={() => handleDetailsClick(row.original)}>
                      Details
                    </Button>
                  </div>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
